const { format } = require('date-fns');
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const User = require('../model/User');
const path = require("path");
const bcrypt = require('bcrypt');

// NOTE: all controller are called after verified emailAddress, so no need to
//       verify email addresses. and it will return request with req.foundUser

const handleRetrieveAllUsers = async (req, res) => {
    const foundUsers = await User.find({});
    if (!foundUsers) {
        res.sendStatus(401);
        return;
    }
    var allUsers = [];
    for (var i=0; i < foundUsers.length; i++) {
        let foundUser = foundUsers[i];
        const fileName = foundUser.profile.avatarFileName;
        const avatar = await getAvatarURLByFileName(fileName);
        if (avatar) {
            foundUser.avatar = avatar;
            const { password, emailAddress, profile, accountSettings, role} = foundUser;
            allUsers.push({
                "avatar": avatar,
                "emailAddress": emailAddress,
                "profile": profile,
                "accountSettings": accountSettings,
                "role": role
            })
        }
    }
    res.status(200).json(allUsers);
}

const getAvatarURLByFileName = async (fileName) => {
    let fileType = path.extname(fileName).replace(".", "");
    var filePath = path.join(__dirname, "..", "avatars", fileName);
    if (fs.existsSync(filePath)) {
        var avatarFile = await fsPromises.readFile(filePath);
        var base64BinaryAvatar = avatarFile.toString("base64");
        const avatar = `data:image/${fileType};base64,${base64BinaryAvatar}`
        return avatar;
    }
    return null;
}

const handleRetrieveUser = async (req, res) => {
    const foundUser = req.foundUser;
    let avatarFileName = foundUser.profile.avatarFileName;

    try {
        const { password, emailAddress, profile, accountSettings, role} = foundUser;
        const avatar = await getAvatarURLByFileName(avatarFileName);
        if (avatar) {
            res.status(200).json({
                "avatar": avatar,
                "emailAddress": emailAddress,
                "profile": profile,
                "accountSettings": accountSettings,
                "role": role
            });
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

// update the saved file name, save user details and send updated user.
const handleUpdateProfile = async (req, res, next) => {
    const { avatar, ...profileDetails } = req.body;
    const searchEmailAddress = req.params.emailAddress;
    var avatarFileName = "";
    let foundUser = req.foundUser;
    let filter = { "emailAddress": searchEmailAddress }

    try {
        if (req.file) {
            var file = req.file;
            // rename the saved file as fullName and _avatar if different file name delete previous file
            const savedFileName = foundUser.profile.avatarFileName;
            const fileName = `${foundUser.emailAddress}_avatar${path.extname(file.originalname)}`;
            console.log(savedFileName, fileName);
            if (savedFileName && foundUser.profile.avatarFileName !== fileName) {
                var savedFilePath = path.join(__dirname, "..", "avatars", savedFileName);
                if (fs.existsSync(savedFilePath)) {
                    await fsPromises.unlink(savedFilePath);
                }
            }
            fs.renameSync(
                file.path,
                file.path.replace(
                    `${format(new Date(), "dd:MM:yy-HH:mm:ss")}_${file.originalname}`, fileName)
            )
            avatarFileName = fileName;
        } else {
            avatarFileName = foundUser.profile.avatarFileName;
        }

        // update profile based on email and previous data;
        await User.findOneAndUpdate(
            filter,
            {
                "profile": { avatarFileName, ...profileDetails }
            }, {upset: true}
        )
        const updatedUser = await User.findOne(filter);
        req.foundUser = updatedUser;
        next(); // send update user to client
    } catch(err) {
        res.status(500).json({"message": err.message})
    }
}

const handleUpdateAccountSettings = async (req, res, next) => {
    try {
        const filter = { "emailAddress": req.params.emailAddress };
        await User.findOneAndUpdate(
            filter,
            { accountSettings: req.body },
            { upset: true }
        );
        const updatedUser = await User.findOne(filter);
        req.foundUser = updatedUser;
        next(); // send update user to client
    } catch (err) {
        res.status(500).json({"message": err.message});
    }
}

const handleUpdatePassword = async (req, res) => {
    let foundUser = req.foundUser;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        res.status(409).send("OldPassword and NewPassword are required");
        return;
    }
    try {
        const matchOldPassword = await bcrypt.compare(oldPassword, foundUser.password);
        console.log(foundUser.password, oldPassword, matchOldPassword);
        if (matchOldPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            const result = await User.findOneAndUpdate(
                { "emailAddress": foundUser.emailAddress},
                { password: hashedPassword },
                { upset: true }
            );
            res.status(200).json({"success": "Password updated."});
        } else {
            res.status(409).send("Invalid password")
        }
    } catch(err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = {
    handleRetrieveAllUsers,
    handleRetrieveUser,
    handleUpdateProfile,
    handleUpdateAccountSettings,
    handleUpdatePassword
}

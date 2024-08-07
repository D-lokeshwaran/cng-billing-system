const { format } = require('date-fns');
const multer = require("multer");
const fs = require("fs");
const fsPromises = fs.promises;
const User = require('../model/User');
const path = require("path");
const bcrypt = require('bcrypt');

const handleUpdateProfile = async (req, res) => {
    if (!req.params.emailAddress) {
        res.status(400).send("Email address is required to search file.")
        return;
    }
    var searchEmailAddress = req.params.emailAddress;
    try {
        const { avatar, emailAddress, ...profile } = req.body;

        if (req.file) {
            var file = req.file;
            // rename the saved file as fullName and _avatar
            var fullName = profile?.fullName.replaceAll(/\s/g, "_");
            const fileName = `${emailAddress}_avatar${path.extname(file.originalname)}`;
            fs.renameSync(
                file.path,
                file.path.replace(
                    `${format(new Date(), "dd:MM:yy-HH:mm:ss")}_${file.originalname}`, fileName)
            )
            profile.avatarFileName = fileName;
        }

        // update profile based on email and previous data;
        let filter = { "emailAddress": searchEmailAddress }
        const foundUser = await User.findOne(filter);
        if (!foundUser) {
            res.status(401).json({"message": "User not found"});
            return;
        }
        const result = await User.findOneAndUpdate(
            filter,
            {
                emailAddress: foundUser.emailAddress,
                profile: {
                    avatarFileName: foundUser.profile.avatarFileName,
                    ...profile
                }
            }, {upset: true}
        );
        res.status(201).json({'success': `${profile.fullName} update!`});
    } catch(err) {
        res.status(500).json({"message": err.message})
    }
}

const handleRetrieveProfile = async (req, res) => {
    if (!req.params.emailAddress) {
        res.status(400).send("Email address is required to search file.")
        return;
    }
    var emailAddress = req.params.emailAddress;
    try {
        const foundUser = await User.findOne({ emailAddress })
        if (!foundUser) {
            res.status(401).json({"message": "User doesn't exits"})
            return;
        }
        let avatarFileName = foundUser.profile.avatarFileName;
        let fileType = path.extname(avatarFileName).replace(".", "");
        var filePath = path.join(__dirname, "..", "avatars", avatarFileName);

        if (fs.existsSync(filePath)) {
            var avatarFile = await fsPromises.readFile(filePath);
            var base64BinaryAvatar = avatarFile.toString("base64");
            const { password, emailAddress, profile} = foundUser;
            const avatar = `data:image/${fileType};base64,${base64BinaryAvatar}`

            res.status(200).json({
                "avatar": avatar,
                "emailAddress": emailAddress,
                "profile": profile
            });
        } else {
            res.sendStatus(400);
        }
    } catch(err) {
        res.status(500).json({"message": err.message})
    }
}

module.exports = { handleUpdateProfile, handleRetrieveProfile };
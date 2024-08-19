const User = require("../model/User");
const { sendRecoverPasswordEmail } = require("../service/emailService");
const jwt = require("jsonwebtoken");

const handleRecoverPassword = async (req, res) => {
    const { emailAddress } = req.body;
    if (!emailAddress) {
        res.sendStatus(409);
        return;
    }
    const foundUser = await User.findOne({ emailAddress });
    if (!foundUser) {
        res.send(403).json({ "message": "User doesn't exist in the system."})
        return;
    }

    try {
        if (req.cookies) {
            // secure vulnerability over sessions but not sure need to learn more
            res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true });
        }
        const resetPasswordToken = await jwt.sign(
            {'emailAddress': foundUser.emailAddress},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '3m' }
        )
        foundUser.refreshToken = resetPasswordToken;
        const result = await foundUser.save();
        await sendRecoverPasswordEmail(
            foundUser.emailAddress,
            foundUser.profile.fullName,
            resetPasswordToken
        )
        res.status(201).json({"success": `Email sent to ${foundUser.emailAddress}, Check your inbox.`})
    } catch (err) {
        res.send(500).json({"message": err.message});
    }
}

module.exports = {
    handleRecoverPassword
}
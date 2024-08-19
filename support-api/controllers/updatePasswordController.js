const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleUpdatePassword = async (req, res) => {
    const { newPassword, emailAddress } = req.body;
    try {
        const foundUser = await User.findOne({ emailAddress });
        if (!foundUser) {
            return res.sendStatus(401);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const result = await User.findOneAndUpdate(
            { "emailAddress": emailAddress },
            { password: hashedPassword, oneTimePassword: null },
            { upset: true }
        );
        res.status(200).json({"success": "Password recovered and reset."});
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

}

module.exports = {
    handleUpdatePassword
}
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleResetPassword = async (req, res) => {
    const { password } = req.body;
    const { user } = req.query;
    try {
        jwt.verify(
            user,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || !decoded.emailAddress)
                    return res.sendStatus(403);
                const { emailAddress } = decoded;
                const hashedPassword = await bcrypt.hash(password, 12);
                const result = await User.findOneAndUpdate(
                    { "emailAddress": emailAddress },
                    { password: hashedPassword },
                    { upset: true }
                );
                res.status(200).json({"success": "Password recovered and reset."});
            }
        );
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

}

module.exports = {
    handleResetPassword
}
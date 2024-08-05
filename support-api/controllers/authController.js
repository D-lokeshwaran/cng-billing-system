const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
        return res.status(400).json({ "message": "emailAddress and password are required."});
    }
    const foundUser = await User.findOne({ emailAddress });
    if (!foundUser) {
        return res.sendStatus(401); // unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "emailAddress": foundUser.emailAddress,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            {'emailAddress': foundUser.emailAddress},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //Saving refresh token with current user;
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // on using jet client comment the secure: true but for chrome use this..
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }); // in production secure: true,
        let { password, ...user} = foundUser;
        res.json({
            accessToken,
            emailAddress: foundUser.emailAddress,
            roles: foundUser.roles
        })
    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };
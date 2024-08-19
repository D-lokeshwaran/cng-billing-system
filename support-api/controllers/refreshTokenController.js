const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;


    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.emailAddress !== decoded.emailAddress)
                return res.status(403).json({"message": err?.message});

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "emailAddress": decoded.emailAddress,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )
            res.json({
                accessToken,
                emailAddress: foundUser.emailAddress,
                role: foundUser.role
            })
        }
    );

}

module.exports = { handleRefreshToken };
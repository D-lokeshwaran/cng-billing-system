const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const token = cookies.jwt;
    console.log(token);

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decodedData) => {
            if (err) return res.status(403).json({'message': err.message});
            next();
        }
    )
}

module.exports = verifyJWT;
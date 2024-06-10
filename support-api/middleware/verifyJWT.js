const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401);
    }

    jwt.verify(
        token,
        process.env.SECRET_TOKEN,
        (err, decodedData) => {
            next(err)
        }
    )
}

module.exports = verifyJWT;
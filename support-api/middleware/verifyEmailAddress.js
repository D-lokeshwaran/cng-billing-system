const User = require("../model/User");

const verifyEmailAddress = async (req, res, next) => {
    if (!req.params.emailAddress) {
        res.status(400).send("Email address is required to search file.")
        return;
    }
    var searchEmailAddress = req.params.emailAddress;

    const filter = { "emailAddress": searchEmailAddress };
    const foundUser = await User.findOne(filter);
    if (!foundUser) {
        res.status(401).json({"message": `User not found for ${searchEmailAddress}`});
        return;
    }
    req.foundUser = foundUser;
    next();
}

module.exports = verifyEmailAddress;
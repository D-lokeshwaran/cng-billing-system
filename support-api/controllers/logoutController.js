const User = require("../model/User");

const handleLogout = async (req, res) => {

    const refreshToken = req.cookies.jwt;

    const foundUser =  await User.findOne({ refreshToken }).exec();;
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true }); // secure: true - only servers on https
    res.status(204).json({"success": `User ${foundUser.emailAddress} successfully logout`});

}

module.exports = { handleLogout }
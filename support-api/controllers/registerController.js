const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Username and password are required."});
    }

    const duplicate = await User.findOne({ username });
    if (duplicate) {
        return res.sendStatus(409); // conflict;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({
            "username": username,
            "password": hashedPassword
        });

        res.status(201).json({'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({"message": err.message})
    }

}

module.exports = { handleNewUser };
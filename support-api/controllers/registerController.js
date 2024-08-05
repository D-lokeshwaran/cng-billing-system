const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { emailAddress, password, fullName, ...profile } = req.body;
    if (!emailAddress || !password) {
        return res.status(400).json({ "message": "emailAddress and password are required."});
    }

    const duplicate = await User.findOne({ emailAddress });
    if (duplicate) {
        return res.sendStatus(409); // conflict;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({
            "emailAddress": emailAddress,
            "password": hashedPassword,
            "profile": {
                fullName,
                ...profile
            }
        });

        res.status(201).json({'success': `New user ${fullName} created!`});
    } catch (err) {
        res.status(500).json({"message": err.message})
    }

}

module.exports = { handleNewUser };
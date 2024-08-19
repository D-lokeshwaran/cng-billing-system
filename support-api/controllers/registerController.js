const User = require('../model/User');
const { v4: uuid } = require('uuid');
const { sendFollowUpEmail } = require('../service/emailService');

const handleNewUser = async (req, res) => {
    const { emailAddress, password, fullName, role, ...profile } = req.body;
    if (!emailAddress) {
        return res.status(400).json({ "message": "emailAddress and password are required."});
    }

    const duplicate = await User.findOne({ emailAddress });
    if (duplicate) {
        return res.sendStatus(409); // conflict;
    }

    try {
        const oneTimePassword = uuid().replaceAll('-', '').substring(0, 11);
        const result = await User.create({
            "emailAddress": emailAddress,
            "oneTimePassword": oneTimePassword,
            "role": role,
            "profile": {
                fullName,
                ...profile
            }
        });
        await sendFollowUpEmail(emailAddress, fullName, oneTimePassword);
        res.status(201).json({'success': `New user ${fullName} created!`});
    } catch (err) {
        res.status(500).json({"message": err.message})
    }

}

module.exports = { handleNewUser };
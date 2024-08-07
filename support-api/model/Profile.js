const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    avatarFileName: {
        type: String,
        requires: true
    },
    fullName: {
        type: String,
        requires: true
    },
    phoneNumber: {
        type: Number,
        requires: true
    },
    status: {
        type: String
    },
    aboutMe: {
        type: String
    }
})

module.exports = Profile;
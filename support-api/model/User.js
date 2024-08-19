const mongoose = require('mongoose');
const Profile = require('./Profile');
const AccountSettings = require('./AccountSettings');

const userSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        requires: true
    },
    role: {
        type: String,
        requires: true,
        default: "Admin"
    },
    password: String,
    oneTimePassword: String,
    profile: Profile,
    accountSettings: AccountSettings,
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);
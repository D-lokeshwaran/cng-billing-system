const mongoose = require('mongoose');
const Profile = require('./Profile');

const userSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        unique: true,
        requires: true
    },
    roles: {
        Admin: {
            type: Number,
            default: 2001
        },
        Operator: Number,
        Customer: Number
    },
    password: {
        type: String,
        requires: true
    },
    profile: Profile,
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);
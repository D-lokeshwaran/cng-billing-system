const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
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
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);
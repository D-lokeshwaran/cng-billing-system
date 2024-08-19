const mongoose = require('mongoose');

const AccountSettings = new mongoose.Schema({
    whoCanView: {
        type: String,
        requires: true,
        default: "myCustomers"
    },
    communicateViaEmail: Boolean,
    communicateViaPhoneNumber: {
        type: Boolean,
        default: true,
    },
    allowDeleteLogs: {
        type: Boolean,
        default: true,
    },
    showAboutMe: {
        type: Boolean,
        default: true
    }
})

module.exports = AccountSettings;
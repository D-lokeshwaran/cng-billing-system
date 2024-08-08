const mongoose = require('mongoose');

const AccountSettings = new mongoose.Schema({
    whoCanView: {
        type: String,
        requires: true
    },
    communicateViaEmail: Boolean,
    communicateViaPhoneNumber: Boolean,
    allowDeleteLogs: Boolean,
    showAboutMe: Boolean
})

module.exports = AccountSettings;
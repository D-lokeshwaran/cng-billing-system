const express = require("express");
const router = express.Router();
const { handleResetPassword } = require('../controllers/resetPasswordController');

router.post('/', handleResetPassword);

module.exports = router;
const express = require("express");
const router = express.Router();
const { handleUpdatePassword } = require('../controllers/updatePasswordController');

router.post('/', handleUpdatePassword);

module.exports = router;
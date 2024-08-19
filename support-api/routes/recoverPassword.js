const express = require("express");
const router = express.Router();
const { handleRecoverPassword } = require('../controllers/recoverPasswordController');

router.post('/', handleRecoverPassword);

module.exports = router;
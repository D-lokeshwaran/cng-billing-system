const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/fileHandler");
const verifyEmailAddress = require("../middleware/verifyEmailAddress");
const {
    handleRetrieveUser,
    handleUpdateProfile,
    handleUpdateAccountSettings,
    handleUpdatePassword
} = require("../controllers/UserController")

router.use("/:emailAddress", verifyEmailAddress)
router.get("/:emailAddress", handleRetrieveUser);
router.put("/:emailAddress/profile", upload.single('avatar'), handleUpdateProfile, handleRetrieveUser);
router.put("/:emailAddress/accountSettings", handleUpdateAccountSettings, handleRetrieveUser);
router.put("/:emailAddress/updatePassword", handleUpdatePassword);

module.exports = router;
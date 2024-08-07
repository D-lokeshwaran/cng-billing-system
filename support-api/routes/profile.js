const express = require("express");
const router = express.Router();
const { handleUpdateProfile, handleRetrieveProfile } = require("../controllers/profileController")
const { upload } = require("../middleware/fileHandler");

router.put("/:emailAddress", upload.single('avatar'), handleUpdateProfile);
router.get("/:emailAddress", handleRetrieveProfile);

module.exports = router;
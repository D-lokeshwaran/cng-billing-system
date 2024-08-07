const multer = require("multer");
const { format } = require('date-fns');

const storage = multer.diskStorage({
    destination: process.env.STORAGE_LOCATION,
    filename: (req, file, cb) => {
        cb(null, `${format(new Date(), "dd:MM:yy-HH:mm:ss")}_${file.originalname}`);
    }
})
const upload = multer( { storage: storage } );

module.exports = { upload };
const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require('../middleware/apisequre');
const pujorelatble = require('../Api/pujorelatable');
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/pujoretable")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "myioImg" + path.extname(file.originalname))
    }
})
const maxsize = 1024 * 1024;
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/svg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(null, new error("format / extenion is wrong"))
        }
    },
    limits: maxsize,
})


router.post('/pujorelatble/post', middleware.adminmiddleware,middleware.sessioncheck,upload.single('image'),pujorelatble.pujorepost);
router.post('/testing',middleware.adminmiddleware,pujorelatble.pujorepost);




module.exports = router;
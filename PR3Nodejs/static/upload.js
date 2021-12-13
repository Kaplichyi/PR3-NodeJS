const multer = require('multer');
let filename;

exports.getStorage = function() {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
            cb(null, filename);
        },
    });
    return storage;
}

exports.getFilename = function () {
    console.log("/uploads/" + filename);
    return "/uploads/" + filename;
}
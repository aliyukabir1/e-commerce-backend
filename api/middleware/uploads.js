const multer = require("multer");
const path = require("path");

// store in memory
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//filter

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extName && mimetype) {
    return cb(null, true);
  }
  cb("Unsupported Format");
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/images");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[0] !== "image") return cb(null, false);
    cb(null, true);
  },
});

module.exports = upload;

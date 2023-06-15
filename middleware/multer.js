const express = require("express");
const app = express();
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: "uploades",
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const Upload = multer({ storage: multerStorage }).array("test", 5);

module.exports = Upload;

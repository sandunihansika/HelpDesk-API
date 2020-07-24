const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
//const upload = require('../config/multer');
const uploadC = require('../controllers/uploadC');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads');
    const { CustomerID } = req.body;
    const dir = `./uploads/${CustomerID}/quotations`;
    fs.stat(dir, exist => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // if (!exist) {
      //   console.log("coming");
      //   return fs.mkdir(dir, error => cb(error, dir))
      // }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    console.log(file);
    var d = new Date();
    let fname = d.toISOString().replace(/:/g, '-');
    cb(null, fname + ' ' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('pdf'), uploadC.uploadPDF);
router.get('/download', uploadC.downloadPDF);

module.exports = router;

const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const uploadC = require('../controllers/uploadC');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads');
    const { NIC } = req.body;
    const { QuotationNo } = req.body;
    const dir = `./uploads/${NIC}/quotations`;
    fs.stat(dir, exist => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
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

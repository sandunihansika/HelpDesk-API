const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads');
    const { NIC } = req.body;
    const { QuotationNo } = req.body;
    const dir = `./uploads/${NIC}/quotations`;
    fs.stat(dir, exist => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
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
module.exports = upload;


const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
//const upload = require('../config/multer');
const uploadC = require('../../controllers/quotation/uploadC');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads');
    console.log('PDF attached');
    //const { customerId } = ;
    const dir = `./uploads/${req.body.customerId}/quotations`;
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
    const quotationNo = req.body.quotationNo;
    //console.log(file);
    var d = new Date();
    let fname = d.toISOString().replace(/:/g, '-');
    //cb(null, fname + ' ' + file.originalname);
    cb(null, quotationNo + '.pdf');
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
//
// function upload(req,res){
//
// }

router.post('/upload/:inquiryId', upload.single('pdf'), uploadC.uploadPDF);
router.get('/download/:customerId/:quotationNo', uploadC.downloadPDF);
router.get('/getQuotations/:customerId', uploadC.getAll);

router.use('/changeStatus', require('../../routes/quotation/changeStatusR'));

module.exports = router;

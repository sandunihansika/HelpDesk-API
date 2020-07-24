const express = require('express');
const router = express.Router();
const quotationC = require('../controllers/quotationC');
const uploadC = require('../controllers/uploadC');
const multer = require('../config/multer');

const app = express();

router.post('/new', quotationC.addQuotation);
router.get('/quotation', quotationC.getQuotation);

module.exports = router;

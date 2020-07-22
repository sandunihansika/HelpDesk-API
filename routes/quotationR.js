const express = require('express');
const router = express.Router();
const quotationC = require('../controllers/quotationC');

const app = express();

router.post('/new', quotationC.addQuotation);

module.exports = router;

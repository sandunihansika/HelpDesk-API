const express = require('express');
const router = express.Router();
const inquiryDetails = require('../controllers/inquiryDetailsC');

router.get('/inquiryDetails', inquiryDetails.getDetails);
router.get('/getHistory/:inquiryId', inquiryDetails.getHistory);

module.exports = router;

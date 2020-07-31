const express = require('express');
const router = express.Router();
const changeStatusC = require('../../controllers/quotation/changeStatusC');

router.put('/approve/:inquiryId/:customerId', changeStatusC.approve);
router.put('/reject/:inquiryId/:customerId', changeStatusC.reject);
router.put('/resend/:inquiryId/:customerId', changeStatusC.resend);
router.put('/send/:inquiryId/:customerId', changeStatusC.send);

module.exports = router;

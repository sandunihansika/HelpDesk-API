const express = require('express');
const router = express.Router();
const changeStatusC = require('../../controllers/quotation/changeStatusC');

router.put('/approve/:inquiryId/:customerId', changeStatusC.approve);
router.put('/reject/:inquiryId/:customerId', changeStatusC.reject);
router.put('/resend/:inquiryId/:customerId/:handlingCompany', changeStatusC.resend);
router.put('/send/:inquiryId/:customerId', changeStatusC.send);
router.put('/resend/ingenii/:inquiryId/:customerId', changeStatusC.resend_ingenii);
router.put('/remind/:inquiryId/:customerId', changeStatusC.remind);

module.exports = router;

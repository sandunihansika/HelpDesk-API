const express = require('express');
const router = express.Router();
const customerC = require('../controllers/customerC');

router.post('/addCustomer', customerC.addCustomer);
router.post('/add/:inquiryType', customerC.addInquiry);
router.get('/existing/:handlingCompany', customerC.getCustomer);
router.get('/getAllCustomers', customerC.getAllCustomers);

module.exports = router;

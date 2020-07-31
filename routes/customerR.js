const express = require('express');
const router = express.Router();
const customerC = require('../controllers/customerC');

router.post('/add/:inquiryType', customerC.addCustomer);
router.get('/existing/:handlingCompany', customerC.getCustomer);
router.get('/getAllCustomers', customerC.getAllCustomers);

module.exports = router;

const express = require('express');
const router = express.Router();
const customerC = require('../controllers/customerC');

const app = express();

router.post('/add/:inquiryType', customerC.addCustomer);
router.get('/existing/:handlingCompany', customerC.getCustomer);

module.exports = router;

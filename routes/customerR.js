const express = require('express');
const router = express.Router();
const customerC = require('../controllers/customerC');

const app = express();

router.post('/customer', customerC.addCustomer);
router.get('/viewdetails', customerC.getCustomer);

module.exports = router;
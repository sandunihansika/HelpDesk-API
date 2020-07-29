const express = require('express');
const router = express.Router();
const companyC = require('../controllers/companyC');

const app = express();

router.get('/view', companyC.getCompany);

module.exports = router;

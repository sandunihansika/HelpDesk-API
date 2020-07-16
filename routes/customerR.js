const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

const app = express();

router.post('/', customerController);

module.exports = router;

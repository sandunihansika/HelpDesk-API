const express = require('express');
const router = express.Router();
const auditC = require('../controllers/auditC');

router.get('/auditreport', auditC.getAudit);

module.exports = router;

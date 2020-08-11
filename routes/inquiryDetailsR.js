const express = require('express');
const router = express.Router();
const inquiryDetails = require('../controllers/inquiryDetailsC');
const UserType = require('../controllers/loginUserType');
const checkUserType = require('../controllers/auth/check-user-type');
const checkToken = require('../controllers/auth/checkToken');

router.get('/inquiryDetails',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType,
  inquiryDetails.getDetails);

router.get('/getHistory/:inquiryId',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType,
  inquiryDetails.getHistory);

module.exports = router;

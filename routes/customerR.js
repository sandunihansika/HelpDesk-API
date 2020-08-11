const express = require('express');
const router = express.Router();
const customerC = require('../controllers/customerC');
const UserType = require('../controllers/loginUserType');
const checkUserType = require('../controllers/auth/check-user-type');
const checkToken = require('../controllers/auth/checkToken');

router.post('/addCustomer',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType, customerC.addCustomer);

router.post('/add/:inquiryType',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType, customerC.addInquiry);

router.get('/existing/:handlingCompany',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType, customerC.getCustomer);

router.get('/getAllCustomers',
  (req, res, next) => {
    res.locals.newuserType = UserType.AdminUser;
    next();
  },
  checkToken,
  checkUserType,
  customerC.getAllCustomers);

module.exports = router;

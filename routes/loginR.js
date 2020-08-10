const express = require('express');
const router = express.Router();
 const loginUserDetails = require('../controllers/loginC');
const checkUserType = require('../controllers/auth/check-user-type');
 const authLogin = require('../controllers/auth/authLogin');


router.get('/login',loginUserDetails.getLoginDetails);

 router.post('/loginp',loginUserDetails.checkLoginDetails,checkUserType,authLogin.validateUserCredentials,authLogin.userLogin);


module.exports = router;

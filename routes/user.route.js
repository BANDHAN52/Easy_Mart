const express = require('express');
const { userLoginPage, userRegistrationPage, userRegistration, userLogin, bankDetailsPage, bankDetails, homePage, logout, cartPage, userOrdersPage } = require('../controllers/user.login.controller');
const { bankTransactionPage } = require('../controllers/bank.transaction.controller');

const router = express.Router();

router.get('/',userLoginPage);
router.post('/',userLogin);

 router.get('/register',userRegistrationPage);
 router.post('/register',userRegistration);

 router.get('/bank_details',bankDetailsPage);
 router.post('/bank_details',bankDetails);

 router.get('/home',homePage);
 router.get('/logout',logout);
 router.get('/cart',cartPage);
 router.get('/orders',userOrdersPage);
 


 module.exports = router;
const express = require('express');
const { bankTransactionPage, bankPaymentTransaction, bankLoginPage, bankLogin, bankHomePage, bankLogout } = require('../controllers/bank.transaction.controller');

const router = express.Router();


router.get('/checkout',bankTransactionPage);
 router.post('/checkout',bankPaymentTransaction);

 router.get('/login',bankLoginPage);
 router.post('/login',bankLogin);

 router.get('/home',bankHomePage);
 router.get('/logout',bankLogout);

 module.exports = router;
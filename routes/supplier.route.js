const express = require('express');
const { supplierLoginPage, supplierLogin, supplerOrdersPage, orderAccept, orderReject, orderSupplied, supplierOrdersPage } = require('../controllers/supplier.controller');
const router = express.Router();


    router.get('/login',supplierLoginPage);
    router.get('/orders',supplierOrdersPage);
    router.post('/login',supplierLogin);
    
    
    router.post('/orders/accept',orderAccept);
    router.post('/orders/reject',orderReject);
    router.post('/orders/supplied',orderSupplied);


 


 module.exports = router;
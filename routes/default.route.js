const express = require('express');
const { defaultHomePage } = require('../controllers/default.controller');
const router = express.Router();


router.get('/',defaultHomePage);

 module.exports = router;
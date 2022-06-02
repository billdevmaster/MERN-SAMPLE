const express = require('express');
const comingsoonCtrl = require('../controller/comingsoonCtrl');
const router = express.Router();

// product category
router.post('/captureEmail', comingsoonCtrl.captureEmail);

module.exports = router;

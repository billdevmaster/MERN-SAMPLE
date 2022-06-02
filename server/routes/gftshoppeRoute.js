const express = require('express');
const gftshoppeAuthCtrl = require('../controller/gftshoppe/authCtrl');
const router = express.Router();

// product category
router.post('/auth/signup', gftshoppeAuthCtrl.signup);
router.post('/auth/signin', gftshoppeAuthCtrl.signin);
// router.post('/auth/profile', gftshoppeCtrl.profile);
// router.post('/successMint', gftshoppeCtrl.successMint);

module.exports = router;

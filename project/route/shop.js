const express = require('express');
const customerControllers = require('../controllers/customer-controller');


const router = express.Router();

router.get('/', customerControllers.getMain);
router.get('/shop', customerControllers.getShop);
router.get('/shop/:id', customerControllers.getShopDetail);



module.exports = router;
const express = require('express');
const cartControllers = require('../controllers/cart-controllers');

const router = express.Router();

router.get('/', cartControllers.getCart);
router.post('/item', cartControllers.addToCart);
router.patch('/item', cartControllers.updateCartItem);

module.exports = router;
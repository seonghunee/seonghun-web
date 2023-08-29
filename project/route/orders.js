const express = require('express');
const ordersControllers = require('../controllers/orders-controllers');

const guardLoute = require('../middlewares/auth-middleware');

const router = express.Router();

router.use(guardLoute.guardLoute);

router.get('/', ordersControllers.getOrders);
router.post('/', ordersControllers.addOrder);

module.exports = router;
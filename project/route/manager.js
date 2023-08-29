const express = require('express');
const managerControllers = require('../controllers/manager-controllers');
const guardLoute = require('../middlewares/auth-middleware');
const configuredMulterMiddleWare = require('../middlewares/imageupload-middleware');

const router = express.Router();

router.use(guardLoute.adminLoute);
router.get('/manager-orders', managerControllers.getManagerOrders);
router.get('/manager-orders/:id', managerControllers.getProductEdit);
router.post('/manager-orders/:id', configuredMulterMiddleWare, managerControllers.productEdit);
router.post('/manager-orders/:id/delete', managerControllers.productDelete);
router.get('/manager-product', managerControllers.getManagerProducts);
router.post('/manager-product', configuredMulterMiddleWare, managerControllers.managerProducts);


module.exports = router;
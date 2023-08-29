const Order = require('../models/orders');
const User = require('../models/user');

async function getOrders(req, res) {

    const orderList = await Order.getOrderList();

    res.render('orders', {orderList: orderList});
}

async function addOrder(req, res) {
    const cart = res.locals.cart;

    const uid = res.locals.user.id;

    let userDocument;
    try {
        userDocument = await User.getUserData(uid);
    } catch(error) {
        return next(error);
    }

    const order = new Order(cart, userDocument);

    try {
        order.save();
    } catch (error) {
        next(error);
        return;
    }

    req.session.cart = null;

    res.redirect('/orders');
}

module.exports = {
    getOrders: getOrders,
    addOrder: addOrder,
}
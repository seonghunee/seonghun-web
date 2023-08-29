const Product = require("../models/product");
const Cart = require('../models/cart');

async function getCart (req, res) {
    console.log(res.locals.cart);

    res.render('cart');
}

async function addToCart(req, res) {
    const productId = req.body.productId;
    const product = await Product.getProductOne(productId);

    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: 'added new item',
        newTotalItems: cart.totalQuantity
    })
}

function updateCartItem(req, res) {
    const cart = res.locals.cart;
    
    const updatedItemData = cart.updateItem(req.body.productId, req.body.quantity);

    req.session.cart = cart;

    res.json({
        message: 'Item updated!',
        updatedCartData: {
            newTatalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    })
}

module.exports = {
    addToCart: addToCart,
    getCart: getCart,
    updateCartItem: updateCartItem
}
const Product = require('../models/product');

function getMain (req, res) {
    res.render('index');
}

async function getShop (req, res) {
    let products;
    try {
        products = await Product.fetchAll();
    } catch(error) {
        next(error);
        return;
    }
    res.render('shop', {products: products});
}

async function getShopDetail (req,res) {
    let product;
    try {
        product = await Product.getProductOne(req.params.id);
    } catch(error) {
        next(error);
        return;
    }

    res.render('product-detail', {product: product});
}


function getOrders (req, res) {
    res.render('orders');
}

module.exports = {
    getMain: getMain,
    getShop: getShop,
    getShopDetail: getShopDetail,
    getOrders: getOrders,
    
}

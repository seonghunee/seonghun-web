const Product = require("../models/product");

function getManagerProducts(req, res) {
  res.render("managerproduct");
}

async function getManagerOrders(req, res) {
  let products;
  try {
    products = await Product.fetchAll();
  } catch (error) {
    next(error);
    return;
  }

  res.render("managerorder", { products: products });
}

async function getProductEdit(req, res) {
  const productId = req.params.id;
  const product = await Product.getProductOne(productId);

  res.render("update-product", { product: product });
}

async function productEdit(req, res) {
  const productData = req.body;
  const uploadImageFile = req.file.filename;
  

  const productId = req.params.id;
  await Product.updateProduct(productId, {
    title: productData.title,
    image: uploadImageFile,
    summary: productData.summary,
    price: productData.price,
    description: productData.description,
  });
  res.redirect("/manager-orders");
}

async function productDelete(req, res) {
  const productId = req.params.id;
  await Product.deleteProduct(productId);

  res.redirect("/manager-orders");
}

async function managerProducts(req, res) {
  const productData = req.body;
  const uploadImageFile = req.file.filename;
  const enteredTitle = productData.title;
  const enteredImage = uploadImageFile;
  const enteredsummary = productData.summary;
  const enteredprice = productData.price;
  const entereddescription = productData.description;

  const product = new Product(
    enteredTitle,
    enteredImage,
    enteredsummary,
    enteredprice,
    entereddescription
  );
  try {
    await product.addNewProduct();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/manager-orders");
}

module.exports = {
  getManagerOrders: getManagerOrders,
  getProductEdit: getProductEdit,
  getManagerProducts: getManagerProducts,
  managerProducts: managerProducts,
  productEdit: productEdit,
  productDelete: productDelete,
};

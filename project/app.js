const express = require("express");
const path = require("path");
const csrf = require('csurf');
const session = require('express-session');

const shop = require("./route/shop");
const auth = require("./route/auth");
const manager = require("./route/manager");
const cart = require("./route/cart");
const orders = require("./route/orders");
const db = require("./data/database");
const csrfTokenMiddleWare = require('./middlewares/csrf-middleware');
const sessionMiddleWare = require('./middlewares/session-middleware');
const cartMiddleWare = require('./middlewares/cart-middleware');
const sessionConfig = require('./config/session');

const sessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use('/product/assets', express.static("product-data"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session(sessionConfig.createSessionConfig(sessionStore)));
app.use(csrf());

app.use(cartMiddleWare);
app.use(csrfTokenMiddleWare);
app.use(sessionMiddleWare);

app.use(auth);
app.use('/cart', cart);
app.use(shop);
app.use('/orders', orders);
app.use(manager);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log(error);
  });

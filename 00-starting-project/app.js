const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const defaultRouter = require('./routes/default');
const restaurantRouter = require('./routes/restaurant');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', defaultRouter);
app.use('/', restaurantRouter);

app.use(function(req, res) {
    res.render('404');
})

app.use(function (error, req,res, next) {
    res.render('500');
})
app.listen(3000);
const express = require('express');
const quoteRouter = require('./routes/quote-router');
const db = require('./data/database');

const app = express();

app.use('/quote', quoteRouter);

app.use(function(error, req, res, next){
    res.status(500).json({
        message: 'error'
    })
})

db.initDb().then(function() {
    app.listen(3000);
}).catch(function(error) {
    console.log(error);
})
const Quote = require('../models/quote-model');

async function getRandomQuote(req, res) {
    let quote;
    try {
        quote = await Quote.getRandomQuote();
    } catch(error) {
        return next(error);
    }
    res.json({
        quote: quote
    })
}

module.exports = {
    getRandomQuote: getRandomQuote
}
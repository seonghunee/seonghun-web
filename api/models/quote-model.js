const db = require('../data/database');

class Quote {
    static async getRandomQuote() {
        const quotes = await db.getDb().collection('quotes').find().toArray();
        const quoteIndex = Math.floor(Math.random() * quotes.length );
        return quotes[quoteIndex].text;
    }
}

module.exports = Quote;
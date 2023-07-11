const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let database;

async function connect () {
    const client = await mongoClient.connect('mongodb://localhost:27017');
    database = client.db('blog');
}

function getDb() {
    if (!database) {
        throw { message: 'Not Connected'};
    }

    return database;
}

module.exports = {
    connect: connect,
    getDb: getDb
}
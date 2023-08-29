const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let database;

async function initDb() {
    const client = await mongoClient.connect('mongodb://localhost:27017');
    database = client.db('api');
}

function getDb(){
    if (!database) {
        throw new Error('Database not connect!');
    }

    return database;
}

module.exports = {
    initDb: initDb,
    getDb: getDb
}
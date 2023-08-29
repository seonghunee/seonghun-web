const MongoDBStore = require('connect-mongodb-session');

function createSessionStore(session) {
    const MongodbStore = MongoDBStore(session);

    const sessionStore = new MongodbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'shop',
        collection: 'sessions'
    })

    return sessionStore;
}

function createSessionConfig(sessionStore) {
    const sessionConfig = {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }
    
    return sessionConfig;
}

module.exports = {
    createSessionStore: createSessionStore,
    createSessionConfig: createSessionConfig,
}
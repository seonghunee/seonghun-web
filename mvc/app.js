const path = require('path');
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const sessionConfig = require('./config/session');
const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const authMiddleWare = require('./middlewares/session-middleware');
const csrfTokenMiddleWare = require('./middlewares/csrf-middleware');

const sessionStore = sessionConfig.createSessionStore(session);

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(sessionStore)));
app.use(csrf());

app.use(csrfTokenMiddleWare);
app.use(authMiddleWare);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});

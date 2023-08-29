const express = require('express');

const db = require('./data/database');
const todoRouter = require('./routes/todo-router');
const todoMiddleWare = require('./middlewares/todo-middleware');

const app = express();

app.use(todoMiddleWare);
app.use(express.json());

app.use('/todos', todoRouter);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: 'Something went wrong!',
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Connecting to the database failed!');
  });

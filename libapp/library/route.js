const express = require('express');
const library = express.Router({ mergeParams: true });

const users = require('./users/route');
const books = require('./books/route');

/* GET home page. */
library.get('/', function(req, res, next) {
  res.send('library');
});

library.use('/books', books);
library.use('/users', users);

module.exports = library;

var express = require('express');
var router = express.Router({ mergeParams: true });

const BookData = require('./data').default;
const BookService = require('./service').default;
const db = require('../../initialsetup/db').default;
var createError = require('http-errors');


const bookData = new BookData(db);
const bookService = new BookService(bookData);

router.get('/', async function (req, res, next) {
  const books = await bookService.getBooks();
  res.send(books);
});

router.get('/:bookId', async function (req, res, next) {
  try {
    const book = await bookService.getBook(req.params.bookId);
    res.send(book);
  } catch (error) {
    next(createError(400, 'Requested book is not present in library'));
  }
});

router.post('/', async function (req, res, next) {
  try {
    const success = await bookService.addBook(req.query);
    res.send(success);
  } catch (error) {
    next(createError(400, 'Book cannot be added to library'));
  }
});

router.delete('/:bookId', async function (req, res, next) {
  try {
    const success = await bookService.deleteBook(req.params.bookId);
    res.send(success);
  } catch (error) {
    next(createError(400, 'Requested book cannot be deleted'));
  }
});

module.exports = router;

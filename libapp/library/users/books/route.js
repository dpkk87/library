var express = require('express');
var router = express.Router({ mergeParams: true });

const BookData = require('./data').default;
const BookService = require('./service').default;
const db = require('../../../initialsetup/db').default;
var createError = require('http-errors');

const bookData = new BookData(db);
const bookService = new BookService(bookData);

router.get('/', async function (req, res, next) {
    const books = await bookService.getBooksForUser(req.params.userId);
    res.send(books);
});

router.get('/:bookId', async function (req, res, next) {
    try {
        const book = await bookService.getBookStatusForUser(req.params.userId, req.params.bookId);
        res.send(book);
    } catch (error) {
        next(createError(400, 'Book is not taken by the user'));
    }
});

router.put('/:bookId', async function (req, res, next) {
    try {
        const success = await bookService.lendBook(req.params.userId, req.params.bookId);
        res.send(success);
    } catch (error) {
        next(createError(400, 'Book cannot be taken'));
    }
});

router.delete('/:bookId', async function (req, res, next) {
    try {
        const success = await bookService.returnBook(req.params.userId, req.params.bookId);
        res.send(success);
    } catch (error) {
        next(createError(400, 'Requested book is not taken by you'));
    }
});

module.exports = router;
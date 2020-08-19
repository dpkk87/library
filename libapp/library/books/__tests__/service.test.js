const sinon = require('sinon');
const BookService = require('../service').default;
describe('Book Service', () => {
    let bookService;
    let bookData = {};
    describe('success scenarios', () => {
        beforeEach(() => {
            bookData = {
                getBooks: jest.fn(() => ([{
                    name: 'Harry potter',
                    author: 'J K Rowling'
                }])),
                getBook: jest.fn(() => ({
                    name: 'Harry potter',
                    author: 'J K Rowling'
                })),
                addBook: jest.fn(),
                deleteBook: jest.fn()
            }
            bookService = new BookService(bookData);
        });

        it('should return list of books', async () => {
            const books = await bookService.getBooks();
            expect(books.length).toBe(1);
        });

        it('should return book details', async () => {
            const book = await bookService.getBook();
            expect(book.name).toBe('Harry potter');
        });

        it('should add book details', async () => {
            const bookDetails = {
                name: 'Harry potter',
                author: 'J K Rowling'
            };
            const addBookSpy = sinon.spy(bookData, 'addBook');
            const success = await bookService.addBook(bookDetails);
            expect(bookData.addBook.calledOnce).toBe(true);
            expect(success).toBe(true);
            addBookSpy.restore();
        });

        it('should delete book details', async () => {
            const bookId = 1;
            const deleteBookSpy = sinon.spy(bookData, 'deleteBook');
            const success = await bookService.deleteBook(bookId);
            expect(bookData.deleteBook.calledOnce).toBe(true);
            expect(success).toBe(true);
            deleteBookSpy.restore();
        });
    });

    describe('success scenarios', () => {
        const err = { message: 'failure' };
        beforeEach(() => {
            bookData = {
                getBooks: jest.fn(() => {
                    throw err;
                }),
                getBook: jest.fn(() => {
                    throw err;
                }),
                addBook: jest.fn(() => {
                    throw err;
                }),
                deleteBook: jest.fn(() => {
                    throw err;
                })
            }
            bookService = new BookService(bookData);
        });

        it('should return list of books', async () => {
            try{
                await bookService.getBooks();
            } catch(err){
                expect(err.message).toBe('failure');
            }
        });

        it('should return book details', async () => {
            try{
                await bookService.getBook();
            } catch(err){
                expect(err.message).toBe('failure');
            }
        });

        it('should add book details', async () => {
            const bookDetails = {
                name: 'Harry potter',
                author: 'J K Rowling'
            };
            const addBookSpy = sinon.spy(bookData, 'addBook');
            try{
                await bookService.addBook(bookDetails);
            } catch(err){
                expect(err.message).toBe('failure');
            }            
            expect(bookData.addBook.calledOnce).toBe(true);
            addBookSpy.restore();
        });

        it('should delete book details', async () => {
            const bookId = 1;
            const deleteBookSpy = sinon.spy(bookData, 'deleteBook');
            try{
                await bookService.deleteBook(bookId);
            } catch(err){
                expect(err.message).toBe('failure');
            }
            expect(bookData.deleteBook.calledOnce).toBe(true);
            deleteBookSpy.restore();
        });
    });
});
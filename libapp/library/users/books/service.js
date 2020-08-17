const Book = require('../../books/model').default;
function BookService(bookData) {
    async function getBooksForUser(userId) {
        try{
            const books = await bookData.getBooksForUser(userId);
            return books.map(book => new Book(book));
        } catch(error){
            throw error;
        }        
    }

    async function lendBook(userId, BookId){
        try {
            bookData.lendBook(userId, BookId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function returnBook(userId, bookId){
        try {
            bookData.returnBook(userId, bookId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function getBookStatusForUser(userId, bookId){
        try {
            const book = await bookData.getBookStatusForUser(userId, bookId);
            return new Book(book);
        }catch(error){
            throw error;
        }
    }

    return {
        getBooksForUser,
        getBookStatusForUser,
        lendBook,
        returnBook
    }
};

exports.default = BookService;
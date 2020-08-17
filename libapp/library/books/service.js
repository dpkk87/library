const Book = require('./model').default;
function BookService(bookData) {
    async function getBooks() {
        try{
            const books = await bookData.getBooks();
            return books.map(book => new Book(book));
        } catch(error){
            throw error;
        }        
    }

    async function addBook(bookDetails){
        const book = new Book(bookDetails);
        try {
            bookData.addBook(book);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function deleteBook(bookId){
        try {
            bookData.deleteBook(bookId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function getBook(bookId){
        try {
            const book = await bookData.getBook(bookId);
            return new Book(book);
        }catch(error){
            throw error;
        }
    }

    return {
        getBooks,
        getBook,
        addBook,
        deleteBook
    }
};

exports.default = BookService;
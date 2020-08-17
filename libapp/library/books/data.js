function Books(db) {
    async function getBooks() {
        var aPromise = new Promise(async function (resolve, reject) {
            db.all(`SELECT * FROM books`, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        return aPromise;
    }

    async function getBook(bookId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.get(`SELECT * FROM books where id = ?`, [bookId], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        return aPromise;
    }

    async function addBook(book) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.run(`INSERT INTO books(name, author) VALUES(?,?)`, [book.name, book.author], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
        return aPromise;
    }

    async function deleteBook(bookId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.run(`DELETE FROM books WHERE id=?`, [bookId], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
        return aPromise;
    }

    return {
        getBooks,
        getBook,
        addBook,
        deleteBook
    }
}

exports.default = Books;
function Books(db) {
    async function getBooksForUser(userId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.all(`SELECT * FROM books where userId= ?`, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        return aPromise;
    }

    async function getBookStatusForUser(userId, bookId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.get(`SELECT * FROM books where userId = ? and id = ?`, [userId, bookId], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        return aPromise;
    }

    async function lendBook(userId, bookId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.get(`SELECT userId FROM books where id = ?`, [bookId], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(row.userId, userId);
                if (!row.userId || row.userId !== userId) {
                    db.run(`UPDATE books SET userId = ? WHERE id = ?`, [userId, bookId], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(true);
                    });
                } else {
                    const err ={status: 400, message: "Book is already taken"}
                    console.log(err);
                    reject(err);
                }
            });
        });
        return aPromise;
    }

    async function returnBook(userId, bookId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.get(`SELECT userId FROM books where id = ?`, [bookId], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(row, userId);
                if (parseInt(row.userId) === parseInt(userId)) {
                    db.run(`UPDATE books SET userId = ? WHERE id = ?`, [null, bookId], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(true);
                    });
                } else {
                    const err ={status: 400, message: "Book is not taken by you"}
                    console.log(err);
                    reject(err);
                }
            });
        });
        return aPromise;
    }

    return {
        getBooksForUser,
        getBookStatusForUser,
        lendBook,
        returnBook
    }
}

exports.default = Books;
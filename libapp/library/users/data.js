function Users(db) {
    async function getUsers() {
        var aPromise = new Promise(async function (resolve, reject) {
            db.all(`SELECT * FROM users`, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        return aPromise;
    }

    async function getUser(userId) {
        var aPromise = new Promise(async function (resolve, reject) {
            console.log(userId);
            db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
                if (err) {
                    reject(err);
                }
                console.log(row);
                resolve(row);
            });
        });
        return aPromise;
    }

    async function addUser(user) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.run(`INSERT INTO users(name, address) VALUES(?,?)`, [user.name, user.address], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
        return aPromise;
    }

    async function deleteUser(userId) {
        var aPromise = new Promise(async function (resolve, reject) {
            db.run(`DELETE FROM users WHERE id=?`, [userId], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
        return aPromise;
    }
    return {
        getUsers,
        getUser,
        addUser,
        deleteUser
    }
}

exports.default = Users;
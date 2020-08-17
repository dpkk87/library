users = [
    {
        'name': 'Sharu',
        'address': '123alpha'
    }
];

books = [
    {
        'name': 'harry potter',
        'author': 'J.K.Rowling',
        'userId': 1
    }
]

exports.default = (dbConnection) => {
    const userDetails = users.map(user => `('${user.name}','${user.address}')`).join(',');
    dbConnection.serialize(() => {
        dbConnection.run('CREATE TABLE users(id integer primary key, name text, address text)')
            .run(`INSERT INTO users(name, address) VALUES${userDetails}`);
    });

    const bookDetails = books.map(book => `('${book.name}','${book.author}','${book.userId}')`).join(',');
    dbConnection.serialize(() => {
        dbConnection.run('CREATE TABLE books(id integer primary key, name text, author text, userId integer)')
            .run(`INSERT INTO books(name, author, userId) VALUES${bookDetails}`);
    });
};
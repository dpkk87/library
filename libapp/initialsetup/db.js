const sqlite3 = require('sqlite3').verbose();
const dataSetup = require('./datasetup').default;
dbConnection = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        reject(err);
    }
});

dataSetup(dbConnection);

exports.default = dbConnection;
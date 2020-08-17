var express = require('express');
const initialSetup = require('./initialsetup').default;

var app = express();
initialSetup(app, express);

module.exports = app;

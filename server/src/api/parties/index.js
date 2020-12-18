const express = require('express');
const app = express();

app.use('/create', require('./modules/Create'));

module.exports = app;
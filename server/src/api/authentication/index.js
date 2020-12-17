const express = require('express');
const app = express();

app.use('/registration', require('./modules/Registration'));
app.use('/login', require('./modules/Login'));

module.exports = app;
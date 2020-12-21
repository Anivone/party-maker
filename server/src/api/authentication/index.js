const express = require('express');
const app = express();

app.use('/registration', require('./modules/Registration'));
app.use('/login', require('./modules/Login'));
app.use('/logout', require('./modules/Logout'));
app.use('/', require('./modules/Authentication'));

module.exports = app;
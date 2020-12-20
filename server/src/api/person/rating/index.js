const express = require('express');
const app = express();

app.use('/', require('./modules/All'));
app.use('/update', require('./modules/Update'));

module.exports = app;
const express = require('express');
const app = express();

app.use('/', require('./modules/All'));
app.use('/create', require('./modules/Create'));
app.use('/update', require('./modules/Update'));
app.use('/remove', require('./modules/Remove'));

module.exports = app;
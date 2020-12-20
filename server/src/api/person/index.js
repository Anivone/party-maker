const express = require('express');
const app = express();

app.use('/rating', require('./rating'));

app.use('/', require('./modules/All'));
app.use('/update', require('./modules/Update'));
app.use('/vote', require('./parties/Vote'));
app.use('/participate', require('./parties/Participate'));
app.use('/recommendation', require('./parties/Recommendation'))

module.exports = app;
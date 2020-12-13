const express = require('express');
const initApp = require('./src/loaders');
const app = express();

initApp(app);

app.listen(process.env.SERVER_PORT,
    () => console.log('Server is listening on port', process.env.SERVER_PORT));
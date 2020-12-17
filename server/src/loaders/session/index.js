const session = require('express-session');

module.exports = app => {
    app.use(
        session({
            secret: 'keyboard key',
            resave: false,
            saveUninitialized: true,
            cookie: {maxAge: 24 * 60 * 60 * 1000},
        })
    );
}
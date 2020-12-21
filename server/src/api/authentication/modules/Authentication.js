const express = require('express');

const app = express();

app.get('/', ((req, res) => {
    res.status(200).send({
        authorized: req.session.authorized ? req.session.authorized : false,
        userId: req.session.userId ? res.session.userId : null
    });
}));

module.exports = app;
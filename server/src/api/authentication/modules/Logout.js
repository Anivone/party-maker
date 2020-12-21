const express = require('express');
const app = express();

app.post('/', [],
    async (req, res, next) => {

        req.cookies.userId = null;
        req.cookies.authorized = false;

        res.status(200)
            .send({
                success: true,
            })
    });

module.exports = app;
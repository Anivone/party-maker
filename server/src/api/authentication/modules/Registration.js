const container = require("../../../container");

const express = require('express');

const app = express();

const {passport} = container.cradle;

app.post('/', [],
    async (req, res, next) => {
        passport.authenticate(
            'user-registration',
            {
                session: true,
            },
            async (err) => {
                if (err) return next(err);

                return res.status(200).send({
                    status: 'success'
                });
            }
        )(req, res, next);
    });

module.exports = app;
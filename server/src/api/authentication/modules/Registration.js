const express = require('express');
const passport = require('passport');

const app = express();

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
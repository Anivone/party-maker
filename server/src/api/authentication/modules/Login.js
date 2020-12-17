const container = require("../../../container");
const express = require('express');
const app = express();

const {passport} = container.cradle;

app.post('/', [],
    async (req, res, next) => {
        passport.authenticate(
            'user-login',
            {
                session: true,
            },
            async (err) => {
                if (err) return next(err);

                if (req.session.authorized)
                    return res.status(200).send({
                        success: true,
                        userId: req.session.userId,
                    });
            }
        )(req, res, next);
    });

module.exports = app;
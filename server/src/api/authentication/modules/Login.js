const express = require('express');
const app = express();

app.post('/', [],
    async (req, res, next) => {
        const {
            passport
        } = req.container.cradle;

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
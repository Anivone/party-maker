const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        personRatingService,
        to,
    } = req.container.cradle;

    const personId = req.body.personId;

    const [err, _] = await to(
        personRatingService.vote(personId, req.body)
    );
    if (err) throw err;

    res.status(200).send({
        success: true
    });

});

module.exports = app;
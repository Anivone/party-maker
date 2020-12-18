const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyService,
        to
    } = req.container.cradle;

    const [err, party] = await to(
        partyService.createParty(req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        party
    });

});

module.exports = app;
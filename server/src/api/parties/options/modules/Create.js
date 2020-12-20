const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyOptionService,
        to
    } = req.container.cradle;

    const [err, partyOption] = await to(
        partyOptionService.createPartyOption(req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partyOption
    });

});

module.exports = app;
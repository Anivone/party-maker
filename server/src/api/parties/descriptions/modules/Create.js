const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyDescriptionService,
        to
    } = req.container.cradle;

    const [err, partyDescription] = await to(
        partyDescriptionService.createPartyDescription(req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partyDescription
    });

});

module.exports = app;
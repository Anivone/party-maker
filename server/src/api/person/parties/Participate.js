const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {personService, to} = req.container.cradle;

    let {personId, partyId} = req.body;

    personId = parseInt(personId);

    const [err, personParty] = await to(
        personService.participate(personId, partyId)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        personParty
    });

});

module.exports = app;
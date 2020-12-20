const express = require('express');
const app = express();

app.get('/:id', async (req, res, next) => {

    const {
        partyService,
        to,
    } = req.container.cradle;

    const {id} = req.params;
    const personId = parseInt(id);

    const [err, parties] = await to(
        partyService.getRecommendedParties(personId)
    )
    if (err) return next(err);

    res.status(200).send({
        success: true,
        parties
    });

});

module.exports = app;
const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {

    const {
        partyService,
        to
    } = req.container.cradle;

    const [err, parties] = await to(
        partyService.findPartiesFullInformation({})
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        parties
    });

});

app.get('/:id', async (req, res, next) => {

    const {
        partyService,
        to,
        mongoose
    } = req.container.cradle;

    const { id } = req.params;
    const partyId = new mongoose.Types.ObjectId(id);

    const [err, party] = await to(
        partyService.findPartiesFullInformation({_id: partyId})
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        party: party[0]
    });

});


module.exports = app;
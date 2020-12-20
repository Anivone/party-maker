const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {

    const {
        partyDescriptionService,
        to
    } = req.container.cradle;

    const [err, partiesDescription] = await to(
        partyDescriptionService.findPartyDescription({}, false, {})
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partiesDescription
    });

});

app.get('/:id', async (req, res, next) => {

    const {
        partyDescriptionService,
        to,
        mongoose
    } = req.container.cradle;

    const { id } = req.params;
    const partyDescriptionId = new mongoose.Types.ObjectId(id);

    const [err, partyDescription] = await to(
        partyDescriptionService.getPartyDescription(partyDescriptionId)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partyDescription
    });

});


module.exports = app;
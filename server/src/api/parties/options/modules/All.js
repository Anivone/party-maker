const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {

    const {
        partyOptionService,
        to
    } = req.container.cradle;

    const [err, partiesOptions] = await to(
        partyOptionService.findPartyOption({}, false, {})
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partiesOptions
    });

});

app.get('/:id', async (req, res, next) => {

    const {
        partyOptionService,
        to,
        mongoose
    } = req.container.cradle;

    const { id } = req.params;
    const partyOptionId = new mongoose.Types.ObjectId(id);

    const [err, partyOption] = await to(
        partyOptionService.getPartyOption(partyOptionId)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        partyOption
    });

});


module.exports = app;
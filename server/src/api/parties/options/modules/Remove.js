const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyOptionService,
        to,
        mongoose,
    } = req.container.cradle;

    const partyOptionId = new mongoose.Types.ObjectId(req.body.partyOptionId);

    const [err, _] = await to(
        partyOptionService.removePartyOption({_id: partyOptionId})
    );
    if (err) return next(err);

    res.status(200).send({
        success: true
    });

});

module.exports = app;
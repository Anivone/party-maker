const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyService,
        to,
        mongoose,
    } = req.container.cradle;

    const partyId = new mongoose.Types.ObjectId(req.body.partyId);

    const [err, _] = await to(
        partyService.updateParty({_id: partyId}, req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true
    });

});

module.exports = app;
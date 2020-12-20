const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        partyDescriptionService,
        to,
        mongoose,
    } = req.container.cradle;

    const partyDescriptionId = new mongoose.Types.ObjectId(req.body.partyDescriptionId);

    const [err, _] = await to(
        partyDescriptionService.updateParty({_id: partyDescriptionId}, req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true
    });

});

module.exports = app;
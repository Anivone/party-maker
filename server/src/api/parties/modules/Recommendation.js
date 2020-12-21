const express = require('express');
const app = express();

app.get('/:id', async (req, res, next) => {

    const {
        recommendationService,
        to,
        mongoose
    } = req.container.cradle;

    const {id} = req.params;
    const partyId = new mongoose.Types.ObjectId(id);

    const [err, people] = await to(
        recommendationService.getPartyRecommendations(partyId)
    )
    if (err) return next(err);

    res.status(200).send({
        success: true,
        people
    });

});

module.exports = app;
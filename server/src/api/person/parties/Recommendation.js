const express = require('express');
const app = express();

app.get('/:id', async (req, res, next) => {

    const {
        recommendationService,
        to
    } = req.container.cradle;

    const {id} = req.params;
    const personId = parseInt(id);

    const [err, person] = await to(
        recommendationService.getPersonRecommendations(personId)
    )
    if (err) return next(err);

    res.status(200).send({
        success: true,
        person
    });

});

module.exports = app;
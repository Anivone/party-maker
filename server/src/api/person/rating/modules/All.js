const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {

    const {
        personRatingService,
        to
    } = req.container.cradle;

    const [err, personRatings] = await to(
        personRatingService.findPersonRating({}, false)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        personRatings
    });

});

app.get('/:id', async (req, res, next) => {

    const {
        personRatingService,
        to
    } = req.container.cradle;

    const { id } = req.params;
    const personId = parseInt(id);

    const [err, personRating] = await to(
        personRatingService.findPersonRating({personId}, true)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        personRating
    });

});


module.exports = app;
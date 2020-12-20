const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        personRatingService,
        to,
    } = req.container.cradle;

    const personRatingId = req.body.personId;

    const [errRating, rating] = await to(
        personRatingService.findPersonRating({personRatingId}, true)
    );
    if (errRating) return next(errRating);

    const marks = (() => {
        let res = {};
        Object.keys(req.body)
            .forEach(key => {
                if (key === 'personId') return;

                const votes = rating[`${key}Votes`];
                const mark = rating[`${key}Rating`];

                res[`${key}Rating`] =
                    (((votes * mark) + req.body[key]) / (votes + 1)).toFixed(1);
                res[`${key}Votes`] = votes + 1;
            });
        return res;
    })();

    const [err, _] = await to(
        personRatingService.updatePersonRating({personRatingId}, marks)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true
    });

});

module.exports = app;
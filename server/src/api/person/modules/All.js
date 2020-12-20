const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {

    const {
        personService,
        to
    } = req.container.cradle;

    const [err, people] = await to(
        personService.findPerson({}, false)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        people
    });

});

app.get('/:id', async (req, res, next) => {

    const {
        personService,
        to
    } = req.container.cradle;

    const personId = parseInt(req.params.id);

    const [err, person] = await to(
        personService.getPerson(personId)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true,
        person
    });

});


module.exports = app;
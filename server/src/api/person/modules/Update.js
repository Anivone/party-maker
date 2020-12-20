const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        personService,
        to,
        mongoose,
    } = req.container.cradle;

    const personId = new mongoose.Types.ObjectId(req.body.personId);

    const [err, _] = await to(
        personService.updatePerson({_id: personId}, req.body)
    );
    if (err) return next(err);

    res.status(200).send({
        success: true
    });

});

module.exports = app;
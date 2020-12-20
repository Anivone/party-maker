const express = require('express');
const app = express();

app.post('/', [], async (req, res, next) => {

    const {
        personPartyService,
        to,
        partyService,
        mongoose
    } = req.container.cradle;

    let {
        personId,
        partyId
    } = req.body;

    personId = parseInt(personId);
    console.log('personId: ', personId);

    const [errFind, findParty] = await to(
        personPartyService.findPersonParty({
            personId, partyId
        }, true)
    );
    if (errFind) return next(errFind);
    if (findParty) return next(new Error("You are already a participant of current party"));

    const [err, personParty] = await to(
        personPartyService.createPersonParty({partyId, personId})
    );
    if (err) return next(err);

    partyId = new mongoose.Types.ObjectId(partyId);

    let [errParticipants, party] = await to(
        partyService.getParty(partyId, {
            participants: true
        })
    );
    if (errParticipants) return next(errParticipants);

    party.participants.push(personId);

    const [errUpdate, _] = await to(
        partyService.updateParty({_id: party._id}, {
            participants: party.participants
        })
    );
    if (errUpdate) return next(errUpdate);

    res.status(200).send({
        success: true,
        personParty
    });

});

module.exports = app;
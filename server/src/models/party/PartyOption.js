const mongoose = require('mongoose');

const partyOptionSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        description: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        price: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        requiredVotes: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        currentVotes: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        partyId: {
            ref: 'Party',
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
    }
);

const PartyOption = mongoose.model('PartyOption', partyOptionSchema);

module.exports = PartyOption;
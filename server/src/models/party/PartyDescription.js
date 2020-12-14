const mongoose = require('mongoose');

const partyDescription = new mongoose.Schema(
    {
        price: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        music: {
            genres: [{
                type: mongoose.SchemaTypes.String,
                required: true,
            }],
            artists: [{
                type: mongoose.SchemaTypes.String,
                required: true,
            }],
            wishlist: [{
                type: mongoose.SchemaTypes.Number,
                required: false,
            }],
        },
        dancing: {
            type: mongoose.SchemaTypes.Boolean,
            required: true,
        },
        alcohol: {
            type: mongoose.SchemaTypes.Boolean,
            required: true,
        },
        hookah: {
            type: mongoose.SchemaTypes.Number,
            required: false,
        },
        ottoman: {
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

const PartyDescription = mongoose.model('PartyDescription', partyDescription);

module.exports = PartyDescription;
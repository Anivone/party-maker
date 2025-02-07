module.exports = ({mongoose}) => {
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
                    type: mongoose.SchemaTypes.String,
                    required: false,
                }],
            },
            dancing: {
                type: mongoose.SchemaTypes.Boolean,
                default: false,
                required: true,
            },
            alcohol: {
                type: mongoose.SchemaTypes.Boolean,
                default: false,
                required: true,
            },
            hookah: {
                type: mongoose.SchemaTypes.Boolean,
                default: false,
                required: false,
            },
            ottoman: {
                type: mongoose.SchemaTypes.Boolean,
                default: false,
                required: true,
            },
            partyId: {
                ref: 'Party',
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
        }
    );

    return mongoose.model('PartyDescription', partyDescription);
}
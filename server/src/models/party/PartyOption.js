module.exports = ({mongoose}) => {
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
                default: 0,
                required: true,
            },
            partyId: {
                ref: 'Party',
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
        }
    );

    return mongoose.model('PartyOption', partyOptionSchema);
}
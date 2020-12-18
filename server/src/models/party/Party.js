module.exports = ({mongoose}) => {
    const partySchema = new mongoose.Schema(
        {
            title: {
                type: mongoose.SchemaTypes.String,
                required: true,
            },
            description: {
                type: mongoose.SchemaTypes.String,
                required: true,
            },
            address: {
                city: {
                    type: mongoose.SchemaTypes.String,
                    required: true,
                },
                street: {
                    type: mongoose.SchemaTypes.String,
                    required: true,
                },
                building: {
                    type: mongoose.SchemaTypes.String,
                    required: true,
                },
            },
            date: {
                type: mongoose.SchemaTypes.Date,
                required: true,
            },
            age: {
                type: mongoose.SchemaTypes.Number,
                required: true,
            },
            requiredParticipants: {
                type: mongoose.SchemaTypes.Number,
                required: true,
            },
            maximumParticipants: {
                type: mongoose.SchemaTypes.Number,
                required: false,
            },
            participants: [{
                type: mongoose.SchemaTypes.String,
                required: true,
            }]
        }
    );

    return mongoose.model('Party', partySchema);
}
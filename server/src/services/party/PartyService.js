module.exports = class PartyService {

    constructor({Party, to, partyDescriptionService}) {
        this.Party = Party;
        this.to = to;
        this.partyDescriptionService = partyDescriptionService;
    }

    async findParty(filter, single, projection) {
        return await single
            ? this.Party.findOne(filter, projection)
            : this.Party.find(filter, projection);
    }

    async aggregateParty(aggregation) {
        return await this.Party.aggregate(aggregation);
    }

    async findPartiesFullInformation(filter) {
        return await this.aggregateParty([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'partyoptions',
                    localField: '_id',
                    foreignField: 'partyId',
                    as: 'options'
                }
            },
            {
                $lookup: {
                    from: 'partydescriptions',
                    localField: '_id',
                    foreignField: 'partyId',
                    as: 'features'
                }
            },
            {
                $unwind: '$features'
            }
        ]);
    }

    async getParty(id, projection) {
        return await this.Party.findById({_id: id}, projection);
    }

    async createParty({
                          title,
                          description,
                          address,
                          date,
                          age,
                          requiredParticipants,
                          maximumParticipants,
                          participants = [],
                          price,
                          music,
                          dancing,
                          alcohol,
                          hookah,
                          ottoman
                      }) {
        const [errParty, party] = await this.to(
            this.Party.create(
                {
                    title,
                    description,
                    address,
                    date,
                    age,
                    requiredParticipants,
                    maximumParticipants,
                    participants,
                })
        );
        if (errParty) throw errParty;

        const [errDesc, _] = await this.to(
            this.partyDescriptionService.createPartyDescription({
                price,
                music,
                dancing,
                alcohol,
                hookah,
                ottoman,
                partyId: party._id,
            })
        );
        if (errDesc) throw errDesc;

        return this.findPartiesFullInformation({_id: party._id});
    }

    async updateParty(filter, body) {
        return await this.Party.update(filter, body);
    }

    async removeParty(filter) {
        return await this.Party.remove(filter);
    }

}
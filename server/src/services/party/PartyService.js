module.exports = class PartyService {

    constructor({Party, to, partyDescriptionService, personService}) {
        this.Party = Party;
        this.to = to;
        this.partyDescriptionService = partyDescriptionService;
        this.personService = personService;
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

    async getRecommendedParties() {
        const [errPerson, people] = await this.to(
            this.personService.findPerson({}, false)
        );

        const recommendCount = 3;
        let result = [];

        for (const person of people) {
            let res = {
                ...person.dataValues,
                recommendedParties: []
            };
            const personId = person.id;
            if (errPerson) throw errPerson;

            const [errFind, parties] = await this.to(
                this.findPartiesFullInformation({})
            )
            if (errFind) throw errFind;

            const personParties = parties
                .filter(f => f.participants.includes(personId.toString()));

            if (personParties.length === 0) {
                res.recommendedParties = parties.slice(0, recommendCount);
                result.push(res);
                continue;
            }

            const averagePrice = personParties
                .map(p => p.features.price)
                .reduce((total, p) => {
                    return total + p;
                }) / personParties.length;

            let priority = {
                dancing: 0,
                alcohol: 0,
                hookah: 0,
                ottoman: 0
            };
            let priorityCount = 0;

            personParties.forEach(f => {
                for (let key in priority) {
                    if (f.features[key]) {
                        ++priority[key];
                        ++priorityCount;
                    }
                }
            });
            for (let key in priority) {
                priority[key] = parseFloat((priority[key] / priorityCount / 2)
                    .toFixed(2));
            }

            const otherParties = parties
                .filter(p => !p.participants.includes(personId.toString()))
                .sort((a, b) => b.value - a.value);

            otherParties.map(p => {
                p.value = 0;
                for (let key in priority) {
                    if (p.features[key])
                        p.value += priority[key];
                }
                if (p.address.city === person.city)
                    p.value += 0.24;
                if (averagePrice + 200 >= p.features.price)
                    p.value += 0.24;

                p.value = parseFloat(p.value.toFixed(2));
            });

            res.recommendedParties = otherParties.slice(0, recommendCount);

            result.push(res);
        }

        return result;
    }

}
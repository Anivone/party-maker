module.exports = class RecommendationService {

    constructor({personService, partyService, to}) {
        this.personService = personService;
        this.partyService = partyService
        this.to = to;
    }

    async getPersonRecommendations(personId) {
        return (await this.getPeopleWithRecommendations()).find(p => p.id === personId);
    }

    async getPartyRecommendations(partyId) {
        return (await this.getPeopleWithRecommendations())
            .filter(p => p.recommendedParties
                .some(party => party._id.toString() === partyId.toString()))
            .map(p => ({
                ...p,
                recommendedParties: undefined
            }));
    }

    async getPeopleWithRecommendations() {
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
                this.partyService.findPartiesFullInformation({})
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

            res.recommendedParties = otherParties
                .sort((a, b) => b.value - a.value)
                .slice(0, recommendCount);

            result.push(res);
        }

        return result;
    }

}
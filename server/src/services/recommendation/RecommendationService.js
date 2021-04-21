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
        // Беремо всіх людей
        const [errPerson, people] = await this.to(
            this.personService.findPerson({}, false)
        );

        const recommendCount = 3;
        let result = [];

        for (const person of people) {
            // res = Person із своїми полями + поле recommendedParties
            let res = {
                ...person.dataValues,
                recommendedParties: []
            };
            const personId = person.id;
            if (errPerson) throw errPerson;

            // Витягуємо всі паті із повною інформацією
            const [errFind, parties] = await this.to(
                this.partyService.findPartiesFullInformation({})
            )
            if (errFind) throw errFind;

            // Фільтруємо ті паті, на які ходив юзер
            const personParties = parties
                .filter(f => f.participants.includes(personId.toString()));

            // Якщо Пьорсон не ходив на паті, то вертаємо перші recommendCount паті для нього
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

            // Додає пріоритетність за умови наявності feature y Паті
            personParties.forEach(f => {
                for (let key in priority) {
                    if (f.features[key]) {
                        ++priority[key];
                        ++priorityCount;
                    }
                }
            });

            // Обчислюємо значення пріоритетності
            for (let key in priority) {
                priority[key] = parseFloat((priority[key] / priorityCount / 2)
                    .toFixed(2));
            }

            // Беремо паті, які ми не відвідували
            const otherParties = parties
                .filter(p => !p.participants.includes(personId.toString()))
                .sort((a, b) => b.value - a.value);

            // Обчислюємо value (значимість) паті для персони (для нас)
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

            // Запихуємо перші recommendCount патіс у recommendedParties персони
            res.recommendedParties = otherParties
                .sort((a, b) => b.value - a.value)
                .slice(0, recommendCount);

            result.push(res);
        }

        return result;
    }

}
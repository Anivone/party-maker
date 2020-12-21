module.exports = class PersonRatingService {

    constructor({postgresRepository, personPartyService, postgres, to}) {
        this.postgresRepository = postgresRepository;
        this.postgres = postgres;
        this.to = to;
        this.personPartyService = personPartyService;
    }

    async findPersonRating(filter, single) {
        return await single
            ? this.postgresRepository.findOne('PersonRating', filter)
            : this.postgresRepository.findAll('PersonRating', filter);
    }

    async getPersonRating(id) {
        return await this.postgresRepository.get('PersonRating', id);
    }

    async vote(personId, body) {
        const [errRating, rating] = await this.to(
            this.findPersonRating({personId}, true)
        );
        if (errRating) throw errRating;

        const marks = (() => {
            let res = {};
            Object.keys(body)
                .forEach(key => {
                    if (key === 'personId') return;

                    const votes = rating[`${key}Votes`];
                    const mark = rating[`${key}Rating`];

                    res[`${key}Rating`] =
                        (((votes * mark) + body[key]) / (votes + 1)).toFixed(1);
                    res[`${key}Votes`] = votes + 1;
                });
            return res;
        })();

        const [err, _] = await this.to(
            this.updatePersonRating({personId}, marks)
        );
        if (err) throw err;

    }

    async createPersonRating({
                                 musicRating,
                                 musicVotes,
                                 atmosphereRating,
                                 atmosphereVotes,
                                 organizationRating,
                                 organizationVotes,
                                 friendlyRating,
                                 friendlyVotes,
                                 adequateRating,
                                 adequateVotes,
                                 civilizedRating,
                                 civilizedVotes,
                                 personId,
                             }) {
        return await this.postgresRepository.create('PersonRating', {
            musicRating,
            musicVotes,
            atmosphereRating,
            atmosphereVotes,
            organizationRating,
            organizationVotes,
            friendlyRating,
            friendlyVotes,
            adequateRating,
            adequateVotes,
            civilizedRating,
            civilizedVotes,
            personId,
        });
    }

    async updatePersonRating(filter, body) {
        return await this.postgresRepository.update('PersonRating', filter, body);
    }

    async removePersonRating(filter) {
        return await this.postgresRepository.remove('PersonRating', filter);
    }

}
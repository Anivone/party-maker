module.exports = class PersonRatingService {

    constructor({postgresRepository, postgres, to}) {
        this.postgresRepository = postgresRepository;
        this.postgres = postgres;
        this.to = to;
    }

    async findPersonRating(filter, single) {
        return await single
            ? this.postgresRepository.findOne('PersonRating', filter)
            : this.postgresRepository.findAll('PersonRating', filter);
    }

    async getPersonRating(id) {
        return await this.postgresRepository.get('PersonRating', id);
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
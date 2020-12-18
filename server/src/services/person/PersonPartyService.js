module.exports = class PersonPartyService {

    constructor({postgresRepository, postgres, to}) {
        this.postgresRepository = postgresRepository;
        this.postgres = postgres;
        this.to = to;
    }

    async findPersonParty(filter, single) {
        return await single
            ? this.postgresRepository.findOne('PersonParty', filter)
            : this.postgresRepository.findAll('PersonParty', filter);
    }

    async getPersonParty(id) {
        return await this.postgresRepository.get('PersonParty', id);
    }

    async createPersonParty({
                                partyId,
                                personId,
                            }) {
        return await this.postgresRepository.create('PersonParty', {
            partyId,
            personId,
        });
    }

    async updatePersonParty(filter, body) {
        return await this.postgresRepository.update('PersonParty', filter, body);
    }

    async removePersonParty(filter) {
        return await this.postgresRepository.remove('PersonParty', filter);
    }

}
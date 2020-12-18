module.exports = class PersonService {

    constructor({postgresRepository, postgres, to}) {
        this.postgresRepository = postgresRepository;
        this.postgres = postgres;
        this.to = to;
    }

    async findPerson(filter, single) {
        return await single
            ? this.postgresRepository.findOne('Person', filter)
            : this.postgresRepository.findAll('Person', filter);
    }

    async getPerson(id) {
        return await this.postgresRepository.get('Person', id);
    }

    async createPerson({
                           firstName,
                           lastName,
                           middleName,
                           birthDate,
                           city,
                           seekingParty
                       }) {
        return await this.postgresRepository.create('Person', {
            firstName,
            lastName,
            middleName,
            birthDate,
            city,
            seekingParty
        });
    }

    async updatePerson(filter, body) {
        return await this.postgresRepository.update('Person', filter, body);
    }

    async removePerson(filter) {
        return await this.postgresRepository.remove('Person', filter);
    }

}
module.exports = class PersonService {

    constructor({postgresRepository, personPartyService, partyService, postgres, to, mongoose}) {
        this.postgresRepository = postgresRepository;
        this.postgres = postgres;
        this.to = to;
        this.personPartyService = personPartyService;
        this.partyService = partyService;
        this.mongoose = mongoose;
    }

    async findPerson(filter, single) {
        return await single
            ? this.postgresRepository.findOne('Person', filter)
            : this.postgresRepository.findAll('Person', filter);
    }

    async getPerson(id) {
        return await this.postgresRepository.get('Person', id);
    }

    async participate(personId, partyId) {
        const [errFind, findParty] = await this.to(
            this.personPartyService.findPersonParty({
                personId, partyId
            }, true)
        );
        if (errFind) throw errFind;
        if (findParty) throw new Error("You are already a participant of current party");

        const [err, personParty] = await this.to(
            this.personPartyService.createPersonParty({partyId, personId})
        );
        if (err) throw err;

        partyId = new this.mongoose.Types.ObjectId(partyId);

        let [errParticipants, party] = await this.to(
            this.partyService.getParty(partyId, {
                participants: true
            })
        );
        if (errParticipants) throw errParticipants;

        party.participants.push(personId);

        const [errUpdate, _] = await this.to(
            this.partyService.updateParty({_id: party._id}, {
                participants: party.participants
            })
        );
        if (errUpdate) throw errUpdate;

        return personParty;
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
module.exports = class PartyService {

    constructor({Party, to}) {
        this.Party = Party;
        this.to = to;
    }

    async findParty(filter, single, projection) {
        return await single
            ? this.Party.findOne(filter, projection)
            : this.Party.find(filter, projection);
    }

    async getParty(id) {
        return await this.Party.get(id);
    }

    async createParty({
                          title,
                          description,
                          address,
                          date,
                          age,
                          requiredParticipants,
                          maximumParticipants,
                          participants,
                      }) {
        return await this.Party.create(
            {
                title,
                description,
                address,
                date,
                age,
                requiredParticipants,
                maximumParticipants,
                participants,
            });
    }

    async updateParty(filter, body) {
        return await this.Party.update(filter, body);
    }

    async removeParty(filter) {
        return await this.Party.remove(filter);
    }

}
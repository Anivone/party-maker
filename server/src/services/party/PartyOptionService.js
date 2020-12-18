module.exports = class PartyOptionService {

    constructor({PartyOption, to}) {
        this.PartyOption = PartyOption;
        this.to = to;
    }

    async findPartyOption(filter, single, projection) {
        return await single
            ? this.PartyOption.findOne(filter, projection)
            : this.PartyOption.find(filter, projection);
    }

    async getPartyOption(id) {
        return await this.PartyOption.get(id);
    }

    async createPartyOption({
                                name,
                                description,
                                price,
                                requiredVotes,
                                currentVotes,
                                partyId,
                            }) {
        return await this.PartyOption.create(
            {
                name,
                description,
                price,
                requiredVotes,
                currentVotes,
                partyId,
            });
    }

    async updatePartyOption(filter, body) {
        return await this.PartyOption.update(filter, body);
    }

    async removePartyOption(filter) {
        return await this.PartyOption.remove(filter);
    }

}
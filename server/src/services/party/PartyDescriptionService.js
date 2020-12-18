module.exports = class PartyDescriptionService {

    constructor({PartyDescription, to}) {
        this.PartyDescription = PartyDescription;
        this.to = to;
    }

    async findPartyDescription(filter, single, projection) {
        return await single
            ? this.PartyDescription.findOne(filter, projection)
            : this.PartyDescription.find(filter, projection);
    }

    async getPartyDescription(id) {
        return await this.PartyDescription.get(id);
    }

    async createPartyDescription({
                                     price,
                                     music,
                                     dancing,
                                     alcohol,
                                     hookah,
                                     ottoman,
                                     partyId,
                                 }) {
        return await this.PartyDescription.create(
            {
                price,
                music,
                dancing,
                alcohol,
                hookah,
                ottoman,
                partyId,
            });
    }

    async updatePartyDescription(filter, body) {
        return await this.PartyDescription.update(filter, body);
    }

    async removePartyDescription(filter) {
        return await this.PartyDescription.remove(filter);
    }

}
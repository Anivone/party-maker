module.exports = class PostgresRepository {

    constructor({postgres, crypto}) {
        this.postgres = postgres;
        this.crypto = crypto;
    };

    async findAll(model, filter) {
        return await this.postgres[model].findAll({
            where: filter
        });
    }

    async findOne(model, filter) {
        return await this.postgres[model].findOne({
            where: filter
        });
    }

    async get(model, id) {
        return await this.postgres[model].findByPk(id);
    }
    //TODO: separate concerns (dal should not implement the logic of generating salt and password)
    async create(model, body) {
        if(model === 'UserAccount') {
            body.salt = this.crypto.randomBytes(64).toString('hex');

            body.password = this.postgres.UserAccount.encryptPassword(body.password, body.salt);
        }

        return await this.postgres[model].create(body);
    }

    async update(model, filter, body) {
        return await this.postgres[model].update(body, {
            where: filter
        });
    }

    async remove(model, filter) {
        return await this.postgres[model].destroy({
            where: filter
        });
    }

}
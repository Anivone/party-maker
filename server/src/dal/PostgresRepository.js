module.exports = class PostgresRepository {

    constructor({postgres}) {
        this.postgres = postgres;
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

    async create(model, body) {
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

    getModel(model) {
        return this.postgres[model];
    }
}
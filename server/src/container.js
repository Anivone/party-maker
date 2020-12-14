const { createContainer, asValue, asClass } = require ('awilix');
const db = require('./loaders/postgres/models');

const container = createContainer();
container.register({
    sequelize: asValue(db.sequelize),
});

module.exports = container;

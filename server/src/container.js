const { createContainer, asValue, asClass } = require ('awilix');
const db = require('./models/person');

const container = createContainer();
container.register({
    postgres: asValue(db),
});

module.exports = container;

const { createContainer, asValue, asClass, asFunction } = require ('awilix');
const db = require('./models/person');
const passport = require('passport');
const to = require('await-to');
const crypto = require('crypto');

const PostgresRepository = require('./dal/PostgresRepository');

module.exports = () => {
    const container = createContainer();

    container.register({
        postgres: asValue(db),
        passport: asValue(passport),
        to: asValue(to),
        crypto: asValue(crypto),

        // Repositories
        postgresRepository: asClass(PostgresRepository).singleton(),
    });

    return container;
};

const { createContainer, asValue, asClass, asFunction } = require ('awilix');
const db = require('./models/person');
const passport = require('passport');
const to = require('await-to');
const crypto = require('crypto');

// Services
const UserService = require('./services/user/UserService');
const PersonService = require('./services/person/PersonService');

// Repositories
const PostgresRepository = require('./dal/PostgresRepository');

module.exports = () => {
    const container = createContainer();

    container.register({
        postgres: asValue(db),
        passport: asValue(passport),
        to: asValue(to),
        crypto: asValue(crypto),


        // Services
        userService: asClass(UserService).singleton(),
        personService: asClass(PersonService).singleton(),

        // Repositories
        postgresRepository: asClass(PostgresRepository).singleton(),
    });

    return container;
};

const { createContainer, asValue, asClass, asFunction } = require ('awilix');
const db = require('./models/person');
const passport = require('passport');
const to = require('await-to');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Mongo Models
const Party = require('./models/party/Party');
const PartyDescription = require('./models/party/PartyDescription');
const PartyOption = require('./models/party/PartyOption');

// Services
const UserService = require('./services/user/UserService');
const PersonService = require('./services/person/PersonService');
const PersonRatingService = require('./services/person/PersonRatingService');
const PersonPartyService = require('./services/person/PersonPartyService');
const PartyService = require('./services/party/PartyService');
const PartyDescriptionService = require('./services/party/PartyDescriptionService');
const PartyOptionService = require('./services/party/PartyOptionService');
const RecommendationService = require('./services/recommendation/RecommendationService');

// Repositories
const PostgresRepository = require('./dal/PostgresRepository');

module.exports = () => {
    const container = createContainer();

    container.register({
        postgres: asValue(db),
        passport: asValue(passport),
        to: asValue(to),
        crypto: asValue(crypto),
        mongoose: asValue(mongoose),

        // Mongo Models
        Party: asFunction(Party).singleton(),
        PartyDescription: asFunction(PartyDescription).singleton(),
        PartyOption: asFunction(PartyOption).singleton(),

        // Services
        userService: asClass(UserService).singleton(),
        personService: asClass(PersonService).singleton(),
        personRatingService: asClass(PersonRatingService).singleton(),
        personPartyService: asClass(PersonPartyService).singleton(),
        partyService: asClass(PartyService).singleton(),
        partyDescriptionService: asClass(PartyDescriptionService).singleton(),
        partyOptionService: asClass(PartyOptionService).singleton(),
        recommendationService: asClass(RecommendationService).singleton(),

        // Repositories
        postgresRepository: asClass(PostgresRepository).singleton(),
    });

    return container;
};

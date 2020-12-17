const express = require('express');
const { createContainer, asValue, asClass, asFunction } = require ('awilix');
const db = require('./models/person');
const crypto = require('crypto');
const passport = require('passport');
const to = require('await-to');

const app = express();

const container = createContainer();
container.register({
    app: asValue(app),
    postgres: asValue(db),
    passport: asValue(passport),
    crypto: asValue(crypto),
    to: asValue(to)
});

module.exports = container;

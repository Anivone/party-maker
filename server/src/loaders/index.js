const dotenv = require('dotenv');
const initMongo = require('./mongo');
const initParsers = require('./parsers');
const initPassport = require('./passport');
const initSession = require('./session');
const {scopePerRequest} = require("awilix-express");
const container = require('../container')();

module.exports = async (app) => {
    dotenv.config();
    app.use(scopePerRequest(container));

    initParsers(app);
    initSession(app);
    await initMongo();
    initPassport(app, container.cradle);

}
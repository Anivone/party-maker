const dotenv = require('dotenv');
const initMongo = require('./mongo');
const initParsers = require('./parsers');
const initPassport = require('./passport');
const initSession = require('./session');

module.exports = async (app) => {
    dotenv.config();
    initParsers(app);
    initSession(app);
    await initMongo();
    initPassport(app);
}
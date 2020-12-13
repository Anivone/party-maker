const dotenv = require('dotenv');
const initMongo = require('./mongo');
const initPostgres = require('./postgres')
const initParsers = require('./parsers');

module.exports = app => {
    dotenv.config();
    initParsers(app);
    initMongo();
    initPostgres();
}
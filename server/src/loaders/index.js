const dotenv = require('dotenv');
const initMongo = require('./mongo');
const initParsers = require('./parsers');

module.exports = async (app) => {
    dotenv.config();
    initParsers(app);
    await initMongo();
}
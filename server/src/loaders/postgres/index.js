const { Client } = require('pg');
const _ = require('dotenv').config();

const client = new Client();

module.exports = async () => await client.connect();
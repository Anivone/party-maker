const cors = require('cors');
const bodyParser = require('body-parser');
const {scopePerRequest} = require("awilix-express");

const container = require('../../container')();

module.exports = app => {
    app.use(cors());
    app.use(bodyParser());
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );

    app.use(scopePerRequest(container));
}
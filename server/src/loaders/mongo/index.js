require('dotenv').config();
const connectionString =
    `${process.env.MONGO_DOMAIN}://${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

module.exports = ({mongoose}) => {
    return mongoose
        .connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
}
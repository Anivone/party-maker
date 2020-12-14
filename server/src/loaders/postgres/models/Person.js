'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Person extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Person.hasMany(models.PersonParty, {
                foreignKey: 'personId',
                as: 'parties'
            });
            Person.hasOne(models.PersonRating, {
                foreignKey: "personId",
                as: 'rating'
            })
        }
    }

    Person.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seekingParty: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Person',
    });
    return Person;
};
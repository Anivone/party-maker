'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PersonRating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PersonRating.belongsTo(models.Person, {
                foreignKey: 'ratingId',
                onDelete: "CASCADE"
            })
        }
    }

    PersonRating.init({
            musicRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            musicVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
            atmosphereRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            atmosphereVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
            organizationRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            organizationVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
            friendlyRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            friendlyVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
            adequateRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            adequateVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
            civilizedRating:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
            civilizedVotes:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
        }, {
            sequelize,
            modelName: 'PersonRating',
        });
    return PersonRating;
};
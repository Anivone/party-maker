'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PersonRatings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            musicRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            musicVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            atmosphereRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            atmosphereVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            organizationRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            organizationVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            friendlyRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            friendlyVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            adequateRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            adequateVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            civilizedRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            civilizedVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            personId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: 'People',
                    key: 'id',
                    as: 'personId',
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PersonRatings');
    }
};
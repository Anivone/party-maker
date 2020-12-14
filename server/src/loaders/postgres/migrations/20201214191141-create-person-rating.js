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
            },
            musicVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            atmosphereRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            atmosphereVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            organizationRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            organizationVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            friendlyRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            friendlyVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            adequateRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            adequateVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            civilizedRating: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            civilizedVotes: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
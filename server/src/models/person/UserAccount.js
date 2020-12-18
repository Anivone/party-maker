'use strict';
const {
    Model
} = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    class UserAccount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserAccount.belongsTo(models.Person, {
                foreignKey: 'personId',
                onDelete: 'CASCADE'
            });
        }

        static generateSalt() {
            return crypto.randomBytes(64).toString('hex');
        }

        static encryptPassword(password, salt) {
            return crypto.pbkdf2Sync(
                password,
                salt,
                10000,
                64,
                'sha512'
            ).toString('base64');
        }

        static isPasswordCorrect(passwordGiven, password, salt) {
            return crypto.pbkdf2Sync(
                passwordGiven,
                salt,
                10000,
                64,
                'sha512'
                ).toString('base64')
                === password
        }

    }

    UserAccount.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'UserAccount',
    });

    return UserAccount;
};
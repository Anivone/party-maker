const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PersonParty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PersonParty.belongsTo(models.Person, {
                foreignKey: 'personId',
                onDelete: 'CASCADE'
            });
        }
    }
    PersonParty.init({
        partyId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'PersonParty',
    });
    return PersonParty;
};
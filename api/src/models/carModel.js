// carModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const CarModel = sequelize.define('CarModel', {
        id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        },
        name: {
        type: DataTypes.STRING,
            allowNull: false,
    },
});

    return CarModel;
};

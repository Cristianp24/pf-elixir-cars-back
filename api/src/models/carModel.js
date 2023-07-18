// carModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const CarModel = sequelize.define('carModel', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        },
        name: {
        type: DataTypes.STRING,
            allowNull: false,
    },
});

    return CarModel;
};

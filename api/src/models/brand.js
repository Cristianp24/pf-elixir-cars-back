// brand.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('brand', {
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

    return Brand;
};

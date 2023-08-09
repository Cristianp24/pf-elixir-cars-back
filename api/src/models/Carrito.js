const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "carritos",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        }
    },
    {
      idUsario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      cantidad: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "carritoDetalles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
    },
    {
      fecha: {
        type: DataTypes.DATE,
      },
    },
    {
      precio: {
        type: DataTypes.INTEGER,
      },
    },
    {
        modelo: {
            type: DataTypes.STRING,
        }
    },
    {
      timestamps: false,
    }
  );
};

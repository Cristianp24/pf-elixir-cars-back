const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ordenes",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        }
    },
    {
        idUsuario: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          unique: true,
        }
    },
    {
        metodoDePago: {
            type: DataTypes.STRING,
            values: ["transf/efect"],
        defaultValue: "transf/efect",
        }
    },
    {
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
      timestamps: false,
    }
  )
};
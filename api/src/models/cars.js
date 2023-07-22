const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cars",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      presentacion: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      precio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      kilometraje: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      combustible: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fichaTecnica: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: false, //no necesito la columna extra donde mustra la fecha de creacion.
    }
  );
};
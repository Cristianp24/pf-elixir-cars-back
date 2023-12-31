const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "car",
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
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      kilometraje: {
        type: DataTypes.INTEGER,
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: () => Math.floor(Math.random() * 5) + 1,
      },
    },
    {
      timestamps: false, //no necesito la columna extra donde mustra la fecha de creacion.
    }
  );
};

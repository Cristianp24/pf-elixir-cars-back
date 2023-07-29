const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CartDetail = sequelize.define(
    "cartDetails",
    {
      // Definición de campos del modelo CartDetail
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      timestamps: false, // No necesito la columna extra donde muestra la fecha de creación.
    }
  );
};

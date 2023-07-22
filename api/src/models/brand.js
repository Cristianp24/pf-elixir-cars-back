const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "brands",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false, //no necesito la columna extra donde mustra la fecha de creacion.
    }
  );
};
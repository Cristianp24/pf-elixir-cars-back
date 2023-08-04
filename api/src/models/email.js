const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "emails",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, //no necesito la columna extra donde mustra la fecha de creacion.
    }
  );
};

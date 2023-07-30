const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    precioTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};

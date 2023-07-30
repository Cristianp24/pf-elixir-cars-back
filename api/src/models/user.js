const { DataTypes } = require("sequelize");
const { carts } = require("../db"); 

module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      
      },
      role:{
        type :DataTypes.STRING,
        values:[ 'admin','user'],
        defaultValue:'user'
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "suspended"],
        allowNull: false,
        defaultValue: "active", 
      }
    },
    {
      timestamps: true,
    }
  );

  // Definir el evento afterCreate
  user.afterCreate(async (user) => {
    try {
      // Crear un carrito asociado al usuario recién creado
      await carts.create({ userId: user.id });

      console.log("Carrito creado para el usuario:", user.id);
    } catch (error) {
      console.error("Error al crear el carrito para el usuario:", error);
    }
  });
return user
};

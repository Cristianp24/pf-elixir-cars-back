const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "OrdenDetalles",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        }
    },
    {
        idOrden: {
            type: DataTypes.INTEGER
        }
    },
    {
        idProducto: {
            type: DataTypes.INTEGER   
        }
    },
    {
        cantidad: {
            type: DataTypes.INTEGER
        }
    },
    {
        precio: {
            type: DataTypes.DECIMAL(10,2)
        }
    },
    {
        timestamps: false,
      }
  )
};
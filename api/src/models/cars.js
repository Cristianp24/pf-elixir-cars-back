const {DataTypes} =  require ('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define('cars', {
        id:{
            type: DataTypes.STRING,
            // defaultValue: DataTypes.STRING,
            primaryKey: true,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        precio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageUrl: {

            type: DataTypes.STRING,
            allowNull: true,
        },
        combustible: {
            type: DataTypes.STRING,

            type: DataTypes.ARRAY(DataTypes.STRING),

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
        fichaTecnica:{
            type: DataTypes.JSON,
            allowNull: true,

        }      
    },{
        timestamps: true//no necesito la columna extra donde mustra la fecha de creacion.
     })

     return Cars;
        }
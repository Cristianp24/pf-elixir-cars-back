const {DataTypes} =  require ('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define('cars', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
};
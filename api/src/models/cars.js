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
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        año:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kilometraje: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fichaTecnica:{
            type: DataTypes.STRING,
            allowNull: false,
        }      
    },{
        timestamps: false//no necesito la columna extra donde mustra la fecha de creacion.
     })

    return Cars;
};
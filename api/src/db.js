require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const brandModel = require("./models/Brand");
const carsModel = require("./models/Cars");
const carModelModel = require("./models/CarModel");


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elixircars`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  );

carsModel(sequelize);
brandModel(sequelize);
carModelModel(sequelize);




  const { Cars, Brand, CarModel } = sequelize.models;

  CarModel.hasMany(Cars);
  Cars.belongsTo(CarModel, { foreignKey: "modelId" });
  
  Brand.hasMany(Cars);
  Cars.belongsTo(Brand, { foreignKey: "brandId" });


  




  module.exports = {
    Cars,
  Brand,
  CarModel,
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  };
  
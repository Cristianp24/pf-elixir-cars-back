require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const brandModel = require("./models/brand");
const carModelModel = require("./models/carModel");
const carsModel = require("./models/cars");


const sequelize = new Sequelize(

    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elixircars`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  );


brandModel(sequelize);
carModelModel(sequelize);
carsModel(sequelize);
// FichaTecnica(sequelize);

const { brand, carModel, cars } = sequelize.models;

carModel.hasMany(cars);
cars.belongsTo(carModel, { foreignKey: "carModelId" });

brand.hasMany(cars);
cars.belongsTo(brand, { foreignKey: "brandId" });

module.exports = {
  carModel,
  cars,
  brand,
  conn: sequelize,
};
  

// una marca tiene muchos carros  de uno a muchos
// modelo tiene muchos carros de  uno a muchos
// paginado de carros 
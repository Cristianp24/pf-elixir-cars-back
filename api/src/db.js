require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const brandModel = require("./models/brand");
const carModelModel = require("./models/carModel");
const carsModel = require("./models/cars");


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elixircars`,
  { logging: false, native: false }
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
  
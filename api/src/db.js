require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const BrandModel = require("./models/brand");
const CarModelModel = require("./models/carModel");
const CarsModel = require("./models/cars");


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elixircars`,
  { logging: false, native: false }
);

BrandModel(sequelize);
CarModelModel(sequelize);
CarsModel(sequelize);

const { brand, carModel, cars } = sequelize.models;

carModel.hasMany(cars);

cars.belongsTo(carModel, { foreignKey: "modelId" });

cars.belongsTo(carModel, { foreignKey: "carModelId" });


brand.hasMany(cars);
cars.belongsTo(brand, { foreignKey: "brandId" });

module.exports = {
  carModel,
  cars,
  brand,
  conn: sequelize,
};





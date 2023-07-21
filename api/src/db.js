require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME } = process.env;

const { Sequelize } = require("sequelize");

const BrandModel = require("./models/brand");
const CarModelModel = require("./models/carModel");
const CarsModel = require("./models/cars");
 

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
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



require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const models = require("./models");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elixircars`,
  { logging: false, native: false }
);

// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

const { brand, carModel, cars } = sequelize.models;

carModel.hasMany(cars);
cars.belongsTo(carModel);

brand.hasMany(cars);
cars.belongsTo(brand);

module.exports = {
  carModel,
  cars,
  brand,
  conn: sequelize,
};

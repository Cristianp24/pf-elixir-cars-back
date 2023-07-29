require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT } = process.env;
const models = require("./models");

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false  }
);
// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

const { brands, carModels, cars, users, cart, cartItem } = sequelize.models;

carModels.hasMany(cars);
cars.belongsTo(carModels), { foreignKey: "carModelId" };

brands.hasMany(cars);
cars.belongsTo(brands, { foreignKey: "brandId" });

brands.hasMany(carModels);
carModels.belongsTo(brands, { foreignKey: "brandId" });

cart.belongsToMany(cars, { through: cartItem });
cars.belongsToMany(cart, { through: cartItem });

users.hasMany(cart, { as: "carts", foreignKey: "userId" });
cart.belongsTo(users, { as: "user", foreignKey: "userId" });




// Definimos un gancho (hook) que se ejecutará antes de crear un nuevo registro
cars.beforeCreate(async (modelo) => {
  const maxId = await cars.max("id", { where: { estado: modelo.estado } });

  const estado = modelo.estado.toLowerCase();
  // Si el estado es "Nuevo" y no hay registros con estado "Nuevo", iniciamos en 1
  // Si el estado es "Usado" y no hay registros con estado "Usado", iniciamos en 1001
  if ((estado === "nuevo" && !maxId) || (estado === "usado" && !maxId)) {
    modelo.id = estado === "nuevo" ? 1 : 1001;
  } else {
    // Si hay registros con el mismo estado, incrementamos el id en 1
    modelo.id = maxId + 1;
  }
});

module.exports = {
  carModels,
  cars,
  brands,
  users,
  conn: sequelize,
};
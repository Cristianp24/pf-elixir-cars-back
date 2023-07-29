require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const models = require("./models");

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

const {
  brands,
  carModels,
  cars,
  users,
  carts,
  cartDetails,
  orders,
  orderDetails,
} = sequelize.models;

carModels.hasMany(cars);
cars.belongsTo(carModels), { foreignKey: "carModelId" };

brands.hasMany(cars);
cars.belongsTo(brands, { foreignKey: "brandId" });

brands.hasMany(carModels);
carModels.belongsTo(brands, { foreignKey: "brandId" });

cars.hasMany(cartDetails);
cartDetails.belongsTo(cars, { foreignKey: "carId" });

carts.hasMany(cartDetails);
cartDetails.belongsTo(carts, { foreignKey: "cartId" });

cars.hasMany(orderDetails);
orderDetails.belongsTo(cars, { foreignKey: "carId" });

orders.hasMany(orderDetails);
orderDetails.belongsTo(orders, { foreignKey: "orderId" });

users.hasOne(carts);
carts.belongsTo(users);

users.hasMany(orders);
orders.belongsTo(users, { foreignKey: "userId" });

// Definimos un gancho (hook) que se ejecutará antes de crear un nuevo registro
cars.beforeCreate(async (car) => {
  const maxId = await cars.max("id", { where: { estado: car.estado } });

  const estado = car.estado.toLowerCase();
  // Si el estado es "Nuevo" y no hay registros con estado "Nuevo", iniciamos en 1
  // Si el estado es "Usado" y no hay registros con estado "Usado", iniciamos en 1001
  if ((estado === "nuevo" && !maxId) || (estado === "usado" && !maxId)) {
    car.id = estado === "nuevo" ? 1 : 1001;
  } else {
    // Si hay registros con el mismo estado, incrementamos el id en 1
    car.id = maxId + 1;
  }
});

// Definir el evento afterCreate
users.afterCreate(async (user) => {
  try {
    // Crear un carrito asociado al usuario recién creado
    await carts.create({ userId: user.id });
  } catch (error) {
    console.error("Error al crear el carrito para el usuario:", error);
  }
});

// Hook (afterCreate) para actualizar el carrito cuando se crea un CartDetail
cartDetails.afterCreate(async (cartDetail) => {
  try {
    // Obtener todos los CartDetails relacionados con el carrito
    const cartDetailsDb = await cartDetails.findAll({
      where: { cartId: cartDetail.cartId },
    });

    // Calcular el nuevo precioTotal y cantidad de items del carrito
    let precioTotal = 0;
    let items = 0;
    for (const detail of cartDetailsDb) {
      precioTotal += detail.precio * detail.cantidad;
      items += detail.cantidad;
    }

    // Actualizar los campos precioTotal y items del carrito
    const cart = await carts.findByPk(cartDetail.cartId);
    cart.precioTotal = precioTotal;
    cart.items = items;
    await cart.save();
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
  }
});

// Hook (afterUpdate) para actualizar el carrito cuando se actualiza un CartDetail
cartDetails.afterUpdate(async (cartDetail) => {
  try {
    // Obtener todos los CartDetails relacionados con el carrito
    const cartDetailsDb = await cartDetailsDb.findAll({
      where: { cartId: cartDetail.cartId },
    });

    // Calcular el nuevo precioTotal y cantidad de items del carrito
    let precioTotal = 0;
    let items = 0;
    for (const detail of cartDetailsDb) {
      precioTotal += detail.precio * detail.cantidad;
      items += detail.cantidad;
    }

    // Actualizar los campos precioTotal y items del carrito
    const cart = await carts.findByPk(cartDetail.cartId);
    cart.precioTotal = precioTotal;
    cart.items = items;
    await cart.save();
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
  }
});

module.exports = {
  carModels,
  cars,
  brands,
  users,
  carts,
  cartDetails,
  orders,
  orderDetails,
  conn: sequelize,
};

require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const models = require("./models");
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;


const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false  }
);

// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

// Capitalizamos los nombres de los modelos ie: car => Car
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Brand,
  CarModel,
  Car,
  User,
  Cart,
  CartDetail,
  Order,
  OrderDetail,
  Review,
  Emails,
} = sequelize.models;

CarModel.hasMany(Car);
Car.belongsTo(CarModel), { foreignKey: "carModelId" };

Brand.hasMany(Car);
Car.belongsTo(Brand, { foreignKey: "brandId" });

Brand.hasMany(CarModel);
CarModel.belongsTo(Brand, { foreignKey: "brandId" });

Car.hasMany(CartDetail);
CartDetail.belongsTo(Car, { foreignKey: "carId" });

Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart, { foreignKey: "cartId" });

Cart.hasMany(Order);
Order.belongsTo(Cart, { foreignKey: "cartId" });

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

Car.hasMany(OrderDetail);
OrderDetail.belongsTo(Car, { foreignKey: "carId" });

User.hasOne(Cart);
Cart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Review);
Review.belongsTo(User, { foreignKey: "userId" });

Car.hasMany(Review);
Review.belongsTo(Car, { foreignKey: "carId" });

// Definimos un gancho (hook) que se ejecutará antes de crear un nuevo registro
Car.beforeCreate(async (car) => {
  const maxId = await Car.max("id", { where: { estado: car.estado } });

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
User.afterCreate(async (user) => {
  try {
    // Crear un carrito asociado al usuario recién creado
    await Cart.create({ userId: user.id });
  } catch (error) {
    console.error("Error al crear el carrito para el usuario:", error);
  }
});

// Función para calcular el precio total y la cantidad de items del carrito
async function updateCart(cartId) {
  try {
    const cartDetailsDb = await CartDetail.findAll({
      where: { cartId },
    });

    let precioTotal = 0;
    let items = 0;
    for (const detail of cartDetailsDb) {
      precioTotal += detail.precio * detail.cantidad;
      items += detail.cantidad;
    }

    const cart = await Cart.findByPk(cartId);
    cart.precioTotal = precioTotal;
    cart.items = items;
    await cart.save();
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
  }
}

// Hook (afterCreate) para actualizar el carrito cuando se crea un CartDetail
CartDetail.afterCreate(async (cartDetail) => {
  await updateCart(cartDetail.cartId);
});

// Hook (afterUpdate) para actualizar el carrito cuando se actualiza un CartDetail
CartDetail.afterUpdate(async (cartDetail) => {
  await updateCart(cartDetail.cartId);
});

// Hook (afterDestroy) para actualizar el carrito cuando se elimina un CartDetail
CartDetail.afterDestroy(async (cartDetail) => {
  await updateCart(cartDetail.cartId);
});

module.exports = {
  CarModel,
  Car,
  Brand,
  User,
  Cart,
  CartDetail,
  Order,
  OrderDetail,
  Review,
  Emails,
  conn: sequelize,
};

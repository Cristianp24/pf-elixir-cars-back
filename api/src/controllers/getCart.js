const { cart, cars, cartItem } = require("../db");

// Controlador para agregar un auto al carrito
async function addToCart(req, res) {
  try {
    const { carId, quantity } = req.body; // Suponiendo que el frontend envía el ID del auto y la cantidad a agregar al carrito

    // Verificar si el auto existe en la base de datos
    const cars = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Obtener el carrito del usuario (asumiendo que ya se ha implementado la lógica de autenticación y el usuario está identificado)
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token o la sesión
    const cart = await cart.findOne({ where: { userId } });

    // Si no existe un carrito para el usuario, crear uno nuevo
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Verificar si el auto ya está en el carrito
    const cartItem = await cartItem.findOne({ where: { cartId: cart.id, carId } });

    if (cartItem) {
      // Si el auto ya está en el carrito, aumentar la cantidad
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Si el auto no está en el carrito, crear un nuevo registro en la tabla intermedia CartItem
      await CartItem.create({ cartId: cart.id, carId, quantity });
    }

    res.status(200).json({ message: "Car added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding car to cart" });
  }
}

// Controlador para obtener el contenido del carrito de un usuario
async function getCartItems(req, res) {
  try {
    // Obtener el carrito del usuario (asumiendo que ya se ha implementado la lógica de autenticación y el usuario está identificado)
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token o la sesión
    const cart = await Cart.findOne({ where: { userId }, include: Car });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart.cars);
  } catch (error) {
    res.status(500).json({ message: "Error getting cart items" });
  }
}

// Controlador para eliminar un auto del carrito
async function removeFromCart(req, res) {
  try {
    const { carId } = req.params;

    // Verificar si el auto existe en la base de datos
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Obtener el carrito del usuario (asumiendo que ya se ha implementado la lógica de autenticación y el usuario está identificado)
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token o la sesión
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Verificar si el auto está en el carrito
    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, carId } });

    if (!cartItem) {
      return res.status(404).json({ message: "Car not found in cart" });
    }

    // Eliminar el auto del carrito
    await cartItem.destroy();

    res.status(200).json({ message: "Car removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing car from cart" });
  }
}

// Otros controladores para actualizar la cantidad de autos en el carrito, realizar la compra, etc., pueden ser implementados según las necesidades de tu aplicación.

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  // Otros controladores...
};

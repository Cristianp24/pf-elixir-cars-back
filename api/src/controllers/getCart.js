const { users, carts } = require("../db");

async function getCart(req, res) {
  const { userId } = req.body;
  try {
    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const cart = await carts.findOne({ where: { userId } });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
}

module.exports = getCart;

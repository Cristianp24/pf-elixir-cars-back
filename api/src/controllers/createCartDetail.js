const { CartDetail, Car, Cart } = require("../db");

async function createCartDetail(req, res) {
  const { cantidad, carId, cartId } = req.body;

  try {
    const carDb = await Car.findByPk(carId);
    if (!carDb) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }
    const cartDb = await Cart.findByPk(cartId);
    if (!cartDb) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    // Crear el nuevo detalle del carrito en la base de datos
    const newCartDetail = await CartDetail.create({
      precio: carDb.precio,
      cantidad,
      cartId,
      carId,
    });

    res.status(201).json(newCartDetail);
  } catch (error) {
    console.error("Error al crear el CartDetail:", error);
    res.status(500).json({ error: "Error al crear el CartDetail" });
  }
}

module.exports = createCartDetail;

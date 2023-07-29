const { cartDetails } = require("../db");

async function createCartDetail(req, res) {
  const { precio, cantidad, cartId } = req.body;

  try {
    // Crear el nuevo detalle del carrito en la base de datos
    const newCartDetail = await cartDetails.create({
      precio,
      cantidad,
      cartId,
    });

    res.status(201).json(newCartDetail);
  } catch (error) {
    console.error("Error al crear el CartDetail:", error);
    res.status(500).json({ error: "Error al crear el CartDetail" });
  }
}

module.exports = createCartDetail;

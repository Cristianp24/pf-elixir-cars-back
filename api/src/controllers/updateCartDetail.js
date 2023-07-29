const { cartDetails } = require("../db");

async function updateCartDetail(req, res) {
  const { id } = req.params;
  const { cantidad } = req.body;

  try {
    // Buscar el CartDetail por su ID
    const cartDetail = await cartDetails.findByPk(id);

    // Verificar si el CartDetail existe
    if (!cartDetail) {
      return res.status(404).json({ error: "CartDetail no encontrado" });
    }

    // Actualizar la cantidad del CartDetail
    cartDetail.cantidad = cantidad;
    await cartDetail.save();

    res.json(cartDetail);
  } catch (error) {
    console.error("Error al actualizar el CartDetail:", error);
    res.status(500).json({ error: "Error al actualizar el CartDetail" });
  }
}

module.exports = updateCartDetail;

const { cartDetails } = require("../db");
async function getAllCartDetails(req, res) {
  const { cartId } = req.body;
  try {
    // Obtener los detalles del carrito de la base de datos después de haberlos creado
    const dbCartDetails = await cartDetails.findAll({
      where: {
        cartId,
      },
    });
    // Responder con la lista completa de detalles del carrito
    res.status(200).json(dbCartDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los detalles del carrito" });
  }
}

module.exports = getAllCartDetails;

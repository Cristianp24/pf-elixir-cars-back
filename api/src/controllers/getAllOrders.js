const { Order, User, Cart, CartDetail } = require("../db");

async function getAllOrders(req, res) {
  try {
    const { userId, cartId } = req.query;
    let filterOptions = {};

    if (userId) {
      // Si userId está presente en la solicitud
      // Realizamos la consulta para obtener las órdenes filtradas por el id de usuario
      const userFound = await User.findOne({
        where: { id: userId },
      });
      filterOptions = { ...filterOptions, userId: userFound.id };
    }

    if (cartId) {
      // Si cartId está presente en la solicitud
      // Realizamos la consulta para obtener las órdenes filtradas por el id del carrito
      const cartFound = await Cart.findOne({
        where: { id: cartId },
      });
      filterOptions = { ...filterOptions, cartId: cartFound.id };
    }

    const dbOrders = await Order.findAll({
      where: filterOptions,
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Cart,
          include: [{ model: CartDetail }],
        },
      ],
    });

    // Responder con la lista completa de órdenes
    res.status(200).json(dbOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
}

module.exports = getAllOrders;

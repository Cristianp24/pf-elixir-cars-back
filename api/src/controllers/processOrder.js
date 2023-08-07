const { Order, CartDetail, conn } = require("../db");

async function processOrder(req, res) {
  const cartId = req.params.cartId;

  try {
    const t = await conn.transaction(); // Iniciar una transacción

    // Crear una nueva orden asociada al carrito
    const order = await Order.create({ cartId }, { transaction: t });

    // Copiar detalles del carrito a la orden
    const cartDetails = await CartDetail.findAll({ where: { cartId } });
    for (const cartDetail of cartDetails) {
      // Crear un nuevo detalle de orden y asociarlo a la orden
      await OrderDetail.create(
        {
          orderId: order.id,
          carId: cartDetail.carId,
          cantidad: cartDetail.cantidad,
          precio: cartDetail.precio,
        },
        { transaction: t }
      );
    }

    // Eliminar los detalles del carrito
    await CartDetail.destroy({ where: { cartId }, transaction: t });

    // Actualizar el carrito (esto también se ejecutará debido a los ganchos)
    await updateCart(cartId);

    await t.commit(); // Confirmar la transacción

    res.status(201).json({ message: "Orden procesada exitosamente" });
  } catch (error) {
    console.error("Error al procesar la orden:", error);
    if (t) await t.rollback(); // Revertir la transacción en caso de error
    res.status(500).json({ error: "Error al procesar la orden" });
  }
}

module.exports = processOrder;

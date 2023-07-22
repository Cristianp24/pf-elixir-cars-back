const { cars, brands, carModels } = require("../db");
const { Op } = require("sequelize");

async function getCarsByPrice(req, res) {
  try {
    const { minPrice, maxPrice } = req.query;

    // Define la condición para el filtro por precio
    const priceCondition = {};
    if (minPrice && maxPrice) {
      priceCondition[Op.between] = [minPrice, maxPrice];
    } else if (minPrice) {
      priceCondition[Op.gte] = minPrice;
    } else if (maxPrice) {
      priceCondition[Op.lte] = maxPrice;
    }

    const carsByPrice = await cars.findAll({
      where: {
        precio: priceCondition,
      },
      include: [
        {
          model: brands,
          attributes: ["name"],
        },
        { model: carModels, attributes: ["name"] },
      ],
    });

    res.json(carsByPrice);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}
//
module.exports = getCarsByPrice;

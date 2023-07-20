const fs = require("fs");
const { cars, brand, carModel } = require("../db");

async function getCarsByMarca(req, res) {
  try {
    const { marca } = req.query;
    const marcaBuscada = await brand.findOne({ where: { name: marca } });

    const carsByMarca = await cars.findAll({
      where: {
        brandId: marcaBuscada.id,
      },
      include: [
        {
          model: brand,
          attributes: ["name"],
        },
        { model: carModel, attributes: ["name"] },
      ],
    });

    res.json(carsByMarca);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}
module.exports = getCarsByMarca;

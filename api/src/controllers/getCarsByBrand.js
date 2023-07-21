const { Op } = require("sequelize");
const { cars, brands, carModels } = require("../db");

async function getCarsByBrand(req, res) {
  try {
    const { brand } = req.query;

    const brandFound = await brands.findOne({
      where: { name: { [Op.iLike]: brand } },
    });

    const carsByBrand = await cars.findAll({
      where: {
        brandId: brandFound.id,
      },
      include: [
        {
          model: brands,
          attributes: ["name"],
        },
        { model: carModels, attributes: ["name"] },
      ],
    });

    // Envia ambos objetos dentro de un objeto
    res.json(carsByBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}

module.exports = getCarsByBrand;

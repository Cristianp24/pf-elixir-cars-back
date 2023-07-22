const { Op } = require("sequelize");
const { brands, carModels } = require("../db");

async function getCarModelsByBrand(req, res) {
  try {
    const { brand } = req.query;

    const brandFound = await brands.findOne({
      where: { name: { [Op.iLike]: brand } },
    });

    const carModelsByBrand = await carModels.findAll({
      where: {
        brandId: brandFound.id,
      },
      include: [
        {
          model: brands,
          attributes: ["name"],
        },
      ],
    });

    // Envia ambos objetos dentro de un objeto
    res.json(carModelsByBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los modelos de autos" });
  }
}

module.exports = getCarModelsByBrand;

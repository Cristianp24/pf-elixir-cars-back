const { Op } = require("sequelize");
const { cars, brands, carModels } = require("../db");

async function getCarsByState(req, res) {
  try {
    const { state } = req.query;

    const carsByState = await cars.findAll({
      where: {
        estado: { [Op.iLike]: state },
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
    res.json(carsByState);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}

module.exports = getCarsByState;

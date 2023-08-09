const { Car, Brand, CarModel } = require("../db");

// Controlador para obtener un automóvil por su ID
async function getCarById(req, res) {
  try {
    const carId = req.params.id;

    // Buscar el automóvil por su ID en la base de datos
    const car = await Car.findByPk(carId, {
      include: [
        {
          model: Brand,
          attributes: ["name"],
        },
        { model: CarModel, attributes: ["name"] },
      ],
    });

    if (!car) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el automóvil" });
  }
}

module.exports = getCarById;

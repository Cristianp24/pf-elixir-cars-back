const { Car } = require("../db");

// Controlador para actualizar un automóvil por su ID
async function updateCar(req, res) {
  try {
    const carId = req.params.id;
    const {
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    } = req.body;

    // Buscar el automóvil por su ID en la base de datos
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    // Actualizar información del automóvil

    await car.update({
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    });

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el automóvil" });
  }
}

module.exports = updateCar;

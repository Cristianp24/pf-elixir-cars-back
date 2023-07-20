const { cars } = require("../db");

// Controlador para eliminar un automóvil por su ID
async function deleteCar(req, res) {
  try {
    const carId = req.params.id;

    // Buscar el automóvil por su ID en la base de datos
    const car = await cars.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    // Eliminar el automóvil de la base de datos
    await car.destroy();

    res.json({ message: "Automóvil eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el automóvil" });
  }
}

module.exports = deleteCar;

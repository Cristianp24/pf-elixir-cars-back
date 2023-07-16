const { cars } = require('../db');

// Controlador para actualizar un automóvil por su ID
async function updateCar(req, res) {
  try {
    const carId = req.params.id;
    const { marca, modelo, precio, estado, year, imageUrl, kilometraje, fichaTecnica } = req.body;

    // Buscar el automóvil por su ID en la base de datos
    const car = await cars.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: 'Automóvil no encontrado' });
    }

    // Actualizar información del automóvil
    car.marca = marca;
    car.modelo = modelo;
    car.precio = precio;
    car.estado = estado;
    car.year = year;
    car.imageUrl = imageUrl;
    car.kilometraje = kilometraje;
    car.fichaTecnica = fichaTecnica;

    // Guardar los cambios en la base de datos
    await car.save();

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el automóvil' });
  }
}

module.exports = updateCar;

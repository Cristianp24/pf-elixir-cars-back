const db = require("../db.js");

async function createCar(req, res) {
  try {
    const {
      marca,
      modelo,
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    } = req.body;

    // Crear el nuevo automóvil en la base de datos
    const newCar = await db.cars.create({
      marca,
      modelo,
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    });

    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el automóvil" });
  }
}
module.exports = createCar;

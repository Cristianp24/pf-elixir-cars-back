const { cars, brands, carModels } = require("../db.js");

async function createCar(req, res) {
  try {
    const {
      marca,
      modelo,
      presentacion,
      precio,
      estado,
      year,
      imageUrl,
      kilometraje,
      combustible,
      fichaTecnica,
    } = req.body;

    // Crear Brand (marca) si no existe
    const [marcaBd, marcaCreada] = await brands.findOrCreate({
      where: { name: marca },
    });

    // Crear CarModel (modelo) si no existe
    const [modeloBd, modeloCreado] = await carModels.findOrCreate({
      where: { name: modelo },
    });

    // Crear el nuevo automóvil en la base de datos
    const [newCar, carCreated] = await cars.findOrCreate({
      where: { presentacion },
      defaults: {
        carModelId: modeloBd.id,
        brandId: marcaBd.id,
        presentacion,
        precio,
        estado,
        year,
        imageUrl,
        kilometraje,
        combustible,
        fichaTecnica,
      },
    });

    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el automóvil" });
  }
}
module.exports = createCar;
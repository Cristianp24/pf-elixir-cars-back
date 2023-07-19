const fs = require("fs");
const db = require("../db"); // Asegúrate de importar el modelo cars desde db.js

async function getAllCars(req, res) {
  try {
    // Leer el archivo JSON local
    const jsonData = fs.readFileSync("../carsapi.json", "utf-8");
    const dataCarApi = JSON.parse(jsonData);

    for (const carData of dataCarApi) {
      // Crear los modelos de autos en la base de datos usando el modelo cars
      const carModel = await db.carModel.findOrCreate({
        where: {
          name: carData.modelo,
        },
      });
      // Crear las marcas de autos en la base de datos usando el modelo cars
      const brand = await db.brand.findOrCreate({
        where: {
          name: carData.marca,
        },
      });

      // Busca el auto por su id
      const existingCar = await db.cars.findByPk(carData.id);

      if (existingCar) {
        // Si el auto existe, actualiza los campos con los datos del JSON
        await db.cars.update(
          {
            year: carData.year,
            precio: carData.precio,
            estado: carData.estado,
            imageUrl: carData.imageUrl,
            imageUrl1: carData.imageUrl1,
            kilometraje: carData.kilometraje,
            fichaTecnica: carData.fichaTecnica,
          },
          {
            where: {
              id: carData.id,
            },
          }
        );
      } else {
        // Si el auto no existe, crea uno nuevo en la base de datos
        await db.cars.create({
          id: carData.id,
          year: carData.year,
          carModelId: carModel[0].id,
          brandId: brand[0].id,
          precio: carData.precio,
          estado: carData.estado,
          imageUrl: carData.imageUrl,
          imageUrl1: carData.imageUrl1,
          kilometraje: carData.kilometraje,
          fichaTecnica: carData.fichaTecnica,
        });
      }
    }

    // Obtener los autos de la base de datos después de haberlos creado
    const dbCars = await db.cars.findAll();
    // console.log(dbCars);
    // Responder con la lista completa de autos
    res.status(200).json(dbCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}

module.exports = getAllCars;

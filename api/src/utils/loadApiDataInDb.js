const fs = require("fs");
const { Car, Brand, CarModel } = require("../db");

const path = require("path");
const filePath = path.join(__dirname, "../../", "carsapi.json");

// Función para cargar la información del archivo JSON en la base de datos
async function loadApiDataInDb() {
  try {
    const apiData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(apiData);
    let createdCount = 0;
    let foundCount = 0;

    for (const carData of data) {
      const {
        id,
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
      } = carData;

      // Cargar Brand (marca) si no existe
      const [marcaBd, marcaCreada] = await Brand.findOrCreate({
        where: { name: marca },
      });

      // Cargar CarModel (modelo) si no existe
      const [modeloBd, modeloCreado] = await CarModel.findOrCreate({
        where: { name: modelo },
        defaults: {
          brandId: marcaBd.id,
        },
      });

      // Cargar Car (auto) si no existe
      const [newCar, carCreated] = await Car.findOrCreate({
        where: { presentacion },
        defaults: {
          carModelId: modeloBd.id,
          brandId: marcaBd.id,
          precio,
          estado,
          year,
          imageUrl,
          kilometraje,
          combustible,
          fichaTecnica,
        },
      });

      if (carCreated) {
        // Si el registro ya existe, aumentar el contador de creados
        createdCount++;
      } else {
        // Si el registro no existe, incrementar el contador de encontrados
        foundCount++;
      }
    }

    console.log(
      `¡Datos cargados exitosamente!, ${createdCount} cars created, ${foundCount} cars found in the database`
    );
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

module.exports = loadApiDataInDb;

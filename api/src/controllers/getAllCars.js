const fs = require("fs");
const { cars, brands, carModels } = require("../db"); // Asegúrate de importar el modelo cars desde db.js

async function getAllCars(req, res) {
  try {
    // Obtener los autos de la base de datos después de haberlos creado
    const dbCars = await cars.findAll({
      include: [
        {
          model: brands,
          attributes: ["name"],
        },
        { model: carModels, attributes: ["name"] },
      ],
    });
    // console.log(dbCars);
    // Responder con la lista completa de autos
    res.status(200).json(dbCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}

module.exports = getAllCars;

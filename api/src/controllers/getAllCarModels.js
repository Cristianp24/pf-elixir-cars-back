const { carModel } = require("../db");
async function getAllCarModels(req, res) {
  // Obtener los autos de la base de datos después de haberlos creado
  try {
    const dbCarModels = await carModel.findAll();
    // Responder con la lista completa de autos
    res.status(200).json(dbCarModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
}

module.exports = getAllCarModels;

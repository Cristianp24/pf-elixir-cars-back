const { carModels, brands } = require("../db");
async function getAllCarModels(req, res) {
  // Obtener los autos de la base de datos después de haberlos creado
  try {
    const dbCarModels = await carModels.findAll({
      include: {
        model: brands,
        attributes: ["name"],
      },
    });
    // Responder con la lista completa de autos
    res.status(200).json(dbCarModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los modelos de autos" });
  }
}

module.exports = getAllCarModels;

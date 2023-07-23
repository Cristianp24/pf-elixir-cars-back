const { brands } = require("../db");
async function getAllBrands(req, res) {
  try {
    // Obtener las marcas de la base de datos después de haberlos creado
    const dbBrands = await brands.findAll();
    // Responder con la lista completa de marcas
    res.status(200).json(dbBrands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
}

module.exports = getAllBrands;

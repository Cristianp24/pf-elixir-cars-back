const { Brand } = require("../db.js");
async function createBrand(req, res) {
  try {
    const { name } = req.body; //----> buena practica!
    // Crear una nueva marca de automóvil en la base de datos
    const newBrand = await brands.create({ name });
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la marca de automóvil" });
  }
}
module.exports = createBrand;

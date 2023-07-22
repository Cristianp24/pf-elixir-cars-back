const { carModels } = require("../db.js");
async function createCarModel(req, res) {
  try {
    const { name } = req.body;

    // Crear el nuevo modelo de automóvil en la base de datos
    const newCarModel = await carModels.create({ name });

    res.status(201).json(newCarModel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el modelo de automóvil" });
  }
}
module.exports = createCarModel;

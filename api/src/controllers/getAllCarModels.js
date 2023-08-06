const { Op } = require("sequelize");
const { CarModel, Brand } = require("../db");
async function getAllCarModels(req, res) {
  // Obtener los modelos de autos de la base de datos después de haberlos creado
  try {
    const { brand } = req.query;
    let filterOptions = {};
    if (brand) {
      // Si brand está presente en la solicitud
      // Realizamos la consulta para obtener los modelos de autos filtrados por la marca
      const brandFound = await Brand.findOne({
        where: { name: { [Op.iLike]: brand } },
      });
      filterOptions = { ...filterOptions, brandId: brandFound.id };
    }

    const dbCarModels = await CarModel.findAll({
      where: filterOptions,
      include: {
        model: Brand,
        attributes: ["name"],
      },
    });
    // Responder con la lista completa de modelos de autos
    res.status(200).json(dbCarModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los modelos de autos" });
  }
}

module.exports = getAllCarModels;

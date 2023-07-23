const { carModels, brands } = require("../db");
async function getAllCarModels(req, res) {
  // Obtener los modelos de autos de la base de datos después de haberlos creado
  try {
    const { brand } = req.query;
    const filterOptions = {};
    if (brand) {
      // Si brand está presente en la solicitud
      // Realizamos la consulta para obtener los modelos de autos filtrados por la marca
      const brandFound = await brands.findOne({
        where: { name: { [Op.iLike]: brand } },
      });
      filterOptions = { ...filterOptions, brandId: brandFound.id };
    }

    const dbCarModels = await carModels.findAll({
      where: filterOptions,
      include: {
        model: brands,
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

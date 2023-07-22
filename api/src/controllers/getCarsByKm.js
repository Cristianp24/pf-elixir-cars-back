const { Op } = require("sequelize");
const { cars } = require("../db");

async function getCarsByKm(req, res) {
  const { minKm, maxKm } = req.query;
  let filterOptions = {};

  if (minKm && maxKm) {
    // Ambos minKm y maxKm están presentes en la solicitud
    // Realizamos la consulta para obtener los autos filtrados por el rango de kilometraje
    filterOptions = {
      kilometraje: { [Op.between]: [minKm, maxKm] },
    };
  } else if (minKm) {
    // Solo minKm está presente en la solicitud
    // Realizamos la consulta para obtener los autos cuyos kilometrajes son mayores o iguales a minKm
    filterOptions = {
      kilometraje: { [Op.gte]: minKm },
    };
  } else if (maxKm) {
    // Solo maxKm está presente en la solicitud
    // Realizamos la consulta para obtener los autos cuyos kilometrajes son menores o iguales a maxKm
    filterOptions = {
      kilometraje: { [Op.lte]: maxKm },
    };
  }

  try {
    const filteredCars = await cars.findAll({
      where: filterOptions,
    });

    // Responder con los autos filtrados
    res.json(filteredCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los autos filtrados por rango de kilometraje.",
    });
  }
}

module.exports = getCarsByKm;

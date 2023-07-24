const { Op } = require("sequelize");
const { cars } = require("../db");

async function getCarsByYear(req, res) {
  const { minYear, maxYear } = req.query;
  let filterOptions = {};

  if (minYear && maxYear) {
    // Ambos minYear y maxYear están presentes en la solicitud
    // Realizamos la consulta para obtener los autos filtrados por el rango de años
    filterOptions = {
      year: { [Op.between]: [minYear, maxYear] },
    };
  } else if (minYear) {
    // Solo minYear está presente en la solicitud
    // Realizamos la consulta para obtener los autos cuyos años son mayores o iguales a minYear
    filterOptions = {
      year: { [Op.gte]: minYear },
    };
  } else if (maxYear) {
    // Solo maxYear está presente en la solicitud
    // Realizamos la consulta para obtener los autos cuyos años son menores o iguales a maxYear
    filterOptions = {
      year: { [Op.lte]: maxYear },
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
      error: "Error al obtener los autos filtrados por rango de años.",
    });
  }
}

module.exports = getCarsByYear;

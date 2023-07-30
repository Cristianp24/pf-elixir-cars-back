const fs = require('fs');
const { cars } = require('../db'); // Asegúrate de importar el modelo cars desde db.js


async function getAllCars(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10 ;
   
    const offset = (page - 1) * limit;

    const {
      brand,
      carModel,
      state,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minKm,
      maxKm,
    } = req.query;

    let filterOptions = {};

    if (brand) {
      // Si brand está presente en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el brand
      const brandFound = await brands.findOne({
        where: { name: { [Op.iLike]: brand } },
      });
      filterOptions = { ...filterOptions, brandId: brandFound.id };
    }
    if (carModel) {
      // Si carModel está presente en la solicitud
      // Realizamos la consulta para obtener los modelos filtrados por el carModel
      const carModelFound = await carModels.findOne({
        where: { name: { [Op.iLike]: carModel } },
      });
      filterOptions = { ...filterOptions, carModelId: carModelFound.id };
    }
    if (state) {
      // Si state está presente en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el estado
      filterOptions = { ...filterOptions, estado: { [Op.iLike]: state } };
    }
    if (minPrice && maxPrice) {
      // Ambos minPrice y maxPrice están presentes en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el rango de precios
      filterOptions = {
        ...filterOptions,
        precio: { [Op.between]: [minPrice, maxPrice] },
      };
    } else if (minPrice) {
      filterOptions = { ...filterOptions, precio: { [Op.gte]: minPrice } };
    } else if (maxPrice) {
      filterOptions = { ...filterOptions, precio: { [Op.lte]: maxPrice } };
    }
    if (minYear && maxYear) {
      // Ambos minYear y maxYear están presentes en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el rango de años
      filterOptions = {
        ...filterOptions,
        year: { [Op.between]: [minYear, maxYear] },
      };
    } else if (minYear) {
      filterOptions = { ...filterOptions, year: { [Op.gte]: minYear } };
    } else if (maxYear) {
      filterOptions = { ...filterOptions, year: { [Op.lte]: maxYear } };
    }
    if (minKm && maxKm) {
      // Ambos minKm y maxKm están presentes en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el rango de kilometraje
      filterOptions = {
        ...filterOptions,
        kilometraje: { [Op.between]: [minKm, maxKm] },
      };
    } else if (minKm) {
      filterOptions = { ...filterOptions, kilometraje: { [Op.gte]: minKm } };
    } else if (maxKm) {
      filterOptions = { ...filterOptions, kilometraje: { [Op.lte]: maxKm } };
    }

    // Obtener todos los autos de la base de datos con el límite y el offset adecuados, y contar el total de elementos.
    const { rows: dbCars, count: totalItems } = await cars.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    


    // Responder con la lista completa de autos
    res.status(200).json(dbCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autos' });
  }
}

module.exports = getAllCars;
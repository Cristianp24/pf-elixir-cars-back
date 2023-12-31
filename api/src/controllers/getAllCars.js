const { Op } = require("sequelize");
const { Car, Brand, CarModel } = require("../db"); // Asegurarse de importar los modelos cars, brands y carModels desde db.js

async function getAllCars(req, res) {
  try {
    // Obtener la página y el límite por página de la solicitud (si no se proporcionan, se asignan valores predeterminados)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calcular el offset (desplazamiento) en la base de datos según la página y el límite por paǵina.
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
      sortByBrand,
      sortByPrice,
    } = req.query;

    let filterOptions = {};

    if (brand) {
      // Si brand está presente en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el brand
      const brandFound = await Brand.findOne({
        where: { name: { [Op.iLike]: brand } },
      });
      filterOptions = { ...filterOptions, brandId: brandFound.id };
    }
    if (carModel) {
      // Si carModel está presente en la solicitud
      // Realizamos la consulta para obtener los modelos filtrados por el carModel
      const carModelFound = await CarModel.findOne({
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

    let orderOptions = [];

    if (sortByBrand) {
      orderOptions.push([{ model: Brand }, "name", sortByBrand]);
    }
    if (sortByPrice) {
      orderOptions.push(["precio", sortByPrice]);
    }

    // Obtener todos los autos de la base de datos con el límite y el offset adecuados, y contar el total de elementos.
    const { rows: dbCars, count: totalItems } = await Car.findAndCountAll({
      limit: limit,
      offset: offset,
      where: filterOptions,
      include: [
        { model: Brand, attributes: ["name"] },
        { model: CarModel, attributes: ["name"] },
      ],
      order: orderOptions,
    });

    // Calcular el total de páginas disponibles
    const totalPages = Math.ceil(totalItems / limit);

    // Responder con la lista paginada de autos y la información de paginación
    res.status(200).json({
      data: dbCars,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los autos" });
  }
}

module.exports = getAllCars;

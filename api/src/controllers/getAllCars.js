const fs = require('fs');
const { cars } = require('../db'); // Asegúrate de importar el modelo cars desde db.js


async function getAllCars(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10 ;
   
    const offset = (page - 1) * limit;
    
    // Obtener los autos de la base de datos después de haberlos creado
    const dbCars = await cars.findAll({
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
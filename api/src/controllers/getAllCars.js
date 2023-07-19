
const fs = require('fs');
const { cars } = require('../db'); // Asegúrate de importar el modelo cars desde db.js


async function getAllCars(req, res) {
  try {
    // Leer el archivo JSON local
    const jsonData = fs.readFileSync('../carsapi.json', 'utf-8');
    const dataCarApi = JSON.parse(jsonData);

    for (const carData of dataCarApi) {
      // Crear los autos en la base de datos usando el modelo cars
      await cars.create({
        id: carData.id,
        marca: carData.marca,
        modelo: carData.modelo,
        year: carData.year,
        precio: carData.precio,
        estado: carData.estado,
        imageUrl: carData.imageUrl,
        imageUrl1: carData.imageUrl1,
        kilometraje: carData.kilometraje,
        fichaTecnica: carData.fichaTecnica
      })};
// Obtener los autos de la base de datos después de haberlos creado
    const dbCars = await cars.findAll();
      // Responder con la lista completa de autos
    res.status(200).json(dbCars);
      
      } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autos' });
  }
}

module.exports = getAllCars;
      

    
  

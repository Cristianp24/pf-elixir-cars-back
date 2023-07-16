const axios = require ('axios')
const { cars, carModel, brand } = require('../db');
const fs = require('fs') // metodo fs para trabajar con archivos

async function getAllCars(req, res){
    try{//leemos el archivo json
        const jsonData = fs.readFileSync('../carsapi.json', 'utf-8');
        const dataCarApi = JSON.parse(jsonData);

        //obtener los perros de la base de datos 
        const dbCars = await cars.findAll({
            include: {
                model: brand,
                attributes: ["name"] 
            }
        });
            //combina los autos json y bd
        const allCars = [...dataCarApi, ...dbCars];
        
        res.json(allCars);
    }   catch (error){
        console.error(error);
        res.status(500),json({error: 'Erros al obtener los autos' });
    }
}

module.exports = getAllCars;
const fs = require('fs')


async function getAllCars(req, res){
    try{//leemos el archivo json
        const jsonData = fs.readFileSync('../carsapi.json', 'utf-8');
        console.log(jsonData);
        const dataCarApi = JSON.parse(jsonData);

        

            //combina los autos json y la base de datos
        res.status(200).json(dataCarApi);
    }   catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener los autos' });
    }
}

module.exports = getAllCars;
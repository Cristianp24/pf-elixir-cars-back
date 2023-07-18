const fs = require('fs');

async function getCarsByMarca(req, res){
    try{
        const marcaBuscada = req.query.marca;

        const jsonData = fs.readFileSync('../carsapi.json', 'utf-8');
        const dataCarApi = JSON.parse(jsonData);

        const carsByMarca = dataCarApi.filter(car => car.marca === marcaBuscada)
        
        res.json(carsByMarca);
    } catch (error){
        res.status(500).json({error: 'Error al obtener los autos' });
    }
}
module.exports = getCarsByMarca;


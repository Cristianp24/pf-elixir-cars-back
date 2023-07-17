//  Angel

//  Develop
const fs = require('fs')


async function getAllCars(req, res){
    try{
      
        const jsonData = fs.readFileSync('../carsapi.json', 'utf-8');
   
        const dataCarApi = JSON.parse(jsonData);

//  Angel
        


 
       
// Develop
          
        res.status(200).json(dataCarApi);
    }   catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener los autos' });
    }
}
 

  
      
        
  
module.exports = getAllCars;
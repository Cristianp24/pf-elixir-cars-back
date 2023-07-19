const { Router } = require("express");
const getAllCars = require("../controllers/getAllCars");
const getCarsByMarca = require("../controllers/getCarsByMarca");
const getCarsByState = require("../controllers/getCarsByState");
const getCarById = require("../controllers/getCarById");
const createCar = require("../controllers/createCar");
const updateCar = require("../controllers/updateCar");
const deleteCar = require("../controllers/deleteCar");
const getAllCarModels = require("../controllers/getAllCarModels");
const getAllBrands = require("../controllers/geAllBrands");

const router = Router();

// Rutas para los autos
router.get("/cars", getAllCars); // Obtener todos los autos
router.get("/cars/marca", getCarsByMarca); // obtener marcasclear
router.get("/state", getCarsByState);
router.get("/cars/:id", getCarById); // Obtener un auto por su ID
router.post("/cars", createCar); // Crear un nuevo auto
router.put("/cars/:id", updateCar); // Actualizar un auto existente
router.delete("/cars/:id", deleteCar); // Eliminar un auto por su ID

router.get("/brands", getAllBrands); // Obtener todas las marcas
router.get("/carModels", getAllCarModels); // Obtener todas los modelos de automóviles

module.exports = router;

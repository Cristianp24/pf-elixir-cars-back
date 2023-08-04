const { Router } = require("express");
const getAllCars = require("../controllers/getAllCars");
const getCarById = require("../controllers/getCarById");
const createCar = require("../controllers/createCar");
const updateCar = require("../controllers/updateCar");
const deleteCar = require("../controllers/deleteCar");
const getAllBrands = require("../controllers/geAllBrands");
const getAllCarModels = require("../controllers/getAllCarModels");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const logOutUser = require("../controllers/logoutUser");
const auth = require("../../middleware/auth");
const logWithGoogle = require("../controllers/logwithGoogle.js");
const getUserByEmail = require("../controllers/getUserByEmail");
const registerEmail = require("../controllers/regiterEmail");
const sendEmail = require("../controllers/sendEmail");

const router = Router();

// Rutas para los autos
router.get("/cars", getAllCars); // Obtener todos los autos
router.get("/cars/:id", getCarById); // Obtener un auto por su ID
router.post("/cars", createCar); // Crear un nuevo auto
router.put("/cars/:id", updateCar); // Actualizar un auto existente
router.delete("/cars/:id", deleteCar); // Eliminar un auto por su ID

// Rutas para las marcas
router.get("/brands", getAllBrands); // Obtener todas las marcas

// Rutas para los modelos
router.get("/carModels", getAllCarModels); // Obtener todas los modelos de automóviles

router.get("/getUser", getUserByEmail);
router.post("/logout", logOutUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/google", logWithGoogle);
router.post("/sendEmail", sendEmail);
router.post("/registerEmail", registerEmail);

module.exports = router;

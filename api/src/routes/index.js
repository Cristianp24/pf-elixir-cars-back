// const { Router } = require("express");
// const getAllCars = require("../controllers/getAllCars");
// const getCarsByBrand = require("../controllers/getCarsByBrand");
// const getCarsByState = require("../controllers/getCarsByState");
// const getCarsByPrice = require("../controllers/getCarsByPrice");
// const getCarById = require("../controllers/getCarById");
// const createCar = require("../controllers/createCar");
// const updateCar = require("../controllers/updateCar");
// const deleteCar = require("../controllers/deleteCar");
// const getAllBrands = require("../controllers/geAllBrands");
// const getAllCarModels = require("../controllers/getAllCarModels");
// const getCarModelsByBrand = require("../controllers/getCarModelsByBrand");
// const getCarsByYear = require("../controllers/getCarsByYear");
// const getCarsByKm = require("../controllers/getCarsByKm");
// const registerUser = require("../controllers/registerUser");
// const loginUser = require("../controllers/loginUser");
// const auth = require("../../middleware/auth");

// const router = Router();

// // Rutas para los autos
// router.get("/cars", getAllCars); // Obtener todos los autos
// router.get("/cars/byBrand", getCarsByBrand); // obtener marcasclear
// router.get("/cars/byState", getCarsByState);
// router.get("/cars/byYear", getCarsByYear);
// router.get("/cars/byKm", getCarsByKm);
// router.get("/cars/byPrice", getCarsByPrice);
// router.get("/cars/:id", getCarById); // Obtener un auto por su ID
// router.post("/cars", createCar); // Crear un nuevo auto
// router.put("/cars/:id", updateCar); // Actualizar un auto existente
// router.delete("/cars/:id", deleteCar); // Eliminar un auto por su ID

// // Rutas para las marcas
// router.get("/brands", getAllBrands); // Obtener todas las marcas

// // Rutas para los modelos
// router.get("/carModels", getAllCarModels); // Obtener todas los modelos de automóviles
// router.get("/carModels/byBrand", getCarModelsByBrand); // Obtener modelos de automóviles por marca

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

// module.exports = router;

const { Router } = require("express");
const getAllCars = require("../controllers/getAllCars");
const getCarsByMarca = require("../controllers/getCarsByMarca");
const getCarsByState = require("../controllers/getCarsByState");
const getCarById = require("../controllers/getCarById");
const createCar = require("../controllers/createCar");
const updateCar = require("../controllers/updateCar");
const deleteCar = require("../controllers/deleteCar");
const getAllCarModels = require("../controllers/getAllCarModels");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const getUsers = require("../controllers/getUsers");
const createUser = require("../controllers/createUser");
const deleteUser = require("../controllers/deleteUser");
const editUser = require("../controllers/editUser");
const suspendUser = require("../controllers/suspendUser")

// const auth = require("../../middleware/auth")

const router = Router();

// Rutas para los autos
router.get("/cars", getAllCars); // Obtener todos los autos
router.get("/cars", getCarsByMarca); // obtener marcasclear
router.get("/state", getCarsByState);
router.get("/cars/:id", getCarById); // Obtener un auto por su ID

// Aquí aplicamos el middleware 
router.post("/cars", verifyToken, checkRole("admin"), createCar);

router.put("/cars/:id", updateCar); // Actualizar un auto existente
router.delete("/cars/:id", deleteCar); // Eliminar un auto por su ID

router.get("/brands", getAllBrands); // Obtener todas las marcas
router.get("/carModels", getAllCarModels); // Obtener todas los modelos de automóviles

router.get("/users", getUsers); //obtener usuarios
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id",  editUser);
router.put("/users/:id/suspend", suspendUser); // Suspender un usuario

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/welcome", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;

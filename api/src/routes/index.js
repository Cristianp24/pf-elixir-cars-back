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
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const getUsers = require("../controllers/getUsers");
const createUser = require("../controllers/createUser");
const deleteUser = require("../controllers/deleteUser");
const editUser = require("../controllers/editUser");
const suspendUser = require("../controllers/suspendUser");

// const auth = require("../../middleware/auth")
const getCart = require("../controllers/getCart");
const updateCartDetail = require("../controllers/updateCartDetail");
const createCartDetail = require("../controllers/createCartDetail");

const router = Router();

// Rutas para los autos
router.get("/cars", getAllCars); // Obtener todos los autos
router.get("/cars/:id", getCarById); // Obtener un auto por su ID

// Aquí aplicamos el middleware
router.post("/cars", verifyToken, checkRole("admin"), createCar);

router.put("/cars/:id", updateCar); // Actualizar un auto existente
router.delete("/cars/:id", deleteCar); // Eliminar un auto por su ID

// Rutas para las marcas
router.get("/brands", getAllBrands); // Obtener todas las marcas

// Rutas para los modelos
router.get("/carModels", getAllCarModels); // Obtener todas los modelos de automóviles

// Rutas para los usuarios
router.get("/users", getUsers); //obtener usuarios
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", editUser);
router.put("/users/:id/suspend", suspendUser); // Suspender un usuario

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/welcome", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Rutas para el carrito
router.get("/cart", getCart);

router.put("/cartDetail/:id", updateCartDetail);
router.post("/cartDetail", createCartDetail);

module.exports = router;

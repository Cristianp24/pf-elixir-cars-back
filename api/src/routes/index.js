const { Router } = require("express");
const getAllCars = require('../controllers/getAllCars')

const router = Router();


router.get("/cars", getAllCars);


module.exports = router;
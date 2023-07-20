const fs = require("fs");
async function getCarsByState(req, res) {
  try {
    const carState = req.query.estado;
    // console.log(carState);

    const json = fs.readFileSync("../carsapi.json", "utf-8");
    const carsData = JSON.parse(json);

    const carsByState = carsData.filter((cars) => cars.estado === carState);
    // console.log(carsByState);

    res.status(200).json(carsByState);
  } catch (error) {
    res.status(500).json({ error: "Error: no se obtuvieron autos" });
  }
}

module.exports = getCarsByState;

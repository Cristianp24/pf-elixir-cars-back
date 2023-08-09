const { Review, Car, User } = require("../db");

async function createReview(req, res) {
  const { calificacion, comentario, carId, userId } = req.body;

  try {
    const carDb = await Car.findByPk(carId);
    if (!carDb) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }
    const userDb = await User.findByPk(userId);
    if (!userDb) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Crear el nuevo review en la base de datos
    const newReview = await Review.create({
      calificacion,
      comentario,
      carId,
      userId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error al crear el Review:", error);
    res.status(500).json({ error: "Error al crear el Review" });
  }
}

module.exports = createReview;

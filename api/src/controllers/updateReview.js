const { Review } = require("../db");

async function updateReview(req, res) {
  const { id } = req.params;
  const { calificacion, comentario } = req.body;

  try {
    // Buscar el Review por su ID
    const review = await Review.findByPk(id);

    // Verificar si el Review existe
    if (!review) {
      return res.status(404).json({ error: "Review no encontrado" });
    }

    // Actualizar la calificacion y el comentario del Review
    review.calificacion = calificacion;
    review.comentario = comentario;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error("Error al actualizar el Review:", error);
    res.status(500).json({ error: "Error al actualizar el Review" });
  }
}

module.exports = updateReview;

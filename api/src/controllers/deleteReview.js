const { Review } = require("../db");

async function deleteReview(req, res) {
  try {
    const reviewId = req.params.id;

    // Buscar el automóvil por su ID en la base de datos
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).send("Review not found");
    }

    // Eliminar el review de la base de datos
    await review.destroy();

    res.status(200).send("Review deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error deleting Review" });
  }
}

module.exports = deleteReview;

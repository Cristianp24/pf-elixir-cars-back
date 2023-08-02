const { CartDetail } = require("../db");

async function deleteCartDetail(req, res) {
  try {
    const cartDetailId = req.params.id;

    //verifico si existe el cartDetail

    const cartDetail = await CartDetail.findByPk(cartDetailId);
    if (!cartDetail) {
      return res.status(404).send("Cart Detail not found");
    }

    await cartDetail.destroy();

    res.status(200).send("Cart Detail deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error deleting Cart Detail" });
  }
}

module.exports = deleteCartDetail;

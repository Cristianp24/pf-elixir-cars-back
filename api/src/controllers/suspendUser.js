const { users } = require("../db");

async function suspendUser(req, res) {
  try {
    const userId = req.params.id;

    // Verificar si el usuario existe
    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Cambiar el estado del usuario
    if (user.status === "suspended") {
      // Si el usuario está suspendido, lo activamos
      user.status = "active";
    } else {
      // Si el usuario no está suspendido, lo suspendemos
      user.status = "suspended";
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error toggling user status" });
  }
}

module.exports = suspendUser;

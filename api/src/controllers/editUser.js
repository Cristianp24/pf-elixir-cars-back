const { User } = require("../db");
const bcrypt = require("bcryptjs");

async function editUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Actualizar los datos del usuario
    user.name = name;
    user.email = email;
    user.role = role;

    // Si se proporcionó una nueva contraseña, encriptarla y actualizarla
    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error editing user" });
  }
}

module.exports = editUser;

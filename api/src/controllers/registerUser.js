const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // Formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Longitud del email
    if (email.length > 30) {
      return res.status(400).send("Email cannot be more than 30 characters");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en nuestra base de datos
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), // Sanitize: convert email to lowercase
      password: encryptedPassword,
      role: role, // Asignar el rol de acuerdo a role
    });

    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // Guardar el token del usuario
    user.token = token;

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = registerUser;
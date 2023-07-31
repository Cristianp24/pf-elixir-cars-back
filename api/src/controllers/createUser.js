const { User } = require("../db");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exists" });
    }

    const encriptedPassword = await bcrypt.hash(password, 10);

    //creamos el usuario en la base de datos

    const newUsers = await User.create({
      name,
      email,
      password: encriptedPassword,
      role,
    });

    res.status(201).json(newUsers);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

module.exports = createUser;

const { users } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log(email, password, "primero");
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await users.findOne({ where: { email } });
    // console.log(email, password, "email confirmado");

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(email, password, "ingresa al if");
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    console.log(email, password, "antes del 400");
    res.status(400).send("Invalid Credentials");
    console.log(email, password, "despues del 400");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;

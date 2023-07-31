<<<<<<< HEAD
const { users } = require("../db");
const bcrypt = require("bcryptjs");
const { serialize } = require("cookie");

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(email, password, "primero");
=======
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const { email, password } = req.body;
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
  try {
    if (!(email && password)) {
      return res.status(400).send("Todos los campos son necesarios");
    }

<<<<<<< HEAD
    const user = await users.findOne({ where: { email } });
    console.log(email, password, "segundo");

    if (user && (await bcrypt.compare(password, user.password))) {
      //Pasando el token que ya tiene el usuario por cookie en los headers
      // const secureCookie = process.env.NODE_ENV === "production";
      console.log(email, password, "dentro del if");

      const serialized = serialize("userToken", user.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      });

      res.setHeader("Set-Cookie", serialized);

      // user
    }
    return res.status(200).json(user);

    return res.status(400).send("Invalid Credentials");
=======
    const user = await User.findOne({ where: { email } });
    console.log(email, password);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.status === "suspended") {
      return res.status(403).send("Account suspended. Please contact support.");
    }

    if (await bcrypt.compare(password, user.password)) {
      console.log(email, password);
      // Create token
      const token = jwt.sign(
        { user_id: user.id, role: user.role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Save user token
      user.token = token;
      await user.save();

      // user
      return res.status(200).json(user);
    } else {
      console.log(email, password);
      res.status(400).send("Invalid Credentials");
    }
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;

const { users } = require("../db");
const bcrypt = require("bcryptjs");
const { serialize } = require("cookie");

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(400).send("Todos los campos son necesarios");
    }

    const user = await users.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Pasando el token que ya tiene el usuario por cookie en los headers
      // const secureCookie = process.env.NODE_ENV === "production";

      const serialized = serialize("userToken", user.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      });

      res.setHeader("Set-Cookie", serialized);

      // user
      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;

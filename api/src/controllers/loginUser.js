const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(400).send("Todos los campos son necesarios");
    }

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
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;

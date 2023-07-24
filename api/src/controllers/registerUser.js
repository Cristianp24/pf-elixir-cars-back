const { users } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }
    //formato de mail vailido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }
    //longitud del mail
    if (email.length > 30) {
      return res.status(400).send("Email cannot be more than 30 characters");
    }

    const oldUser = await users.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create users in our database
    const user = await users.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // save users token
    user.token = token;
    await user.save()

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = registerUser;

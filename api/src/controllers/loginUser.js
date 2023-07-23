const { users } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function loginUser(req, res) {
    const { email, password } = req.body;
  try {
    console.log(email, password);
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await users.findOne({where: {email}});
    console.log(email, password);

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log(email, password);
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
      res.status(200).json(user);
    }
    console.log(email, password);
    res.status(400).send("Invalid Credentials")
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;

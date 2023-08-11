const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
<<<<<<< HEAD
    // console.log(email, password);
=======
    
    console.log(email, password);
>>>>>>> e35d5047377992dee33d5aafaf9975bfe117dfa1
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ where: { email } });
<<<<<<< HEAD
    // console.log(email, password);
=======
    console.log(user);
>>>>>>> e35d5047377992dee33d5aafaf9975bfe117dfa1

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.status === "suspended") {
      return res.status(403).send("Account suspended. Please contact support.");
    }

    if (await bcrypt.compare(password, user.password)) {
      // console.log(email, password);
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
      // console.log(email, password);
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser; 

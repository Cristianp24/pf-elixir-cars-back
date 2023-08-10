const { User } = require("../db");

async function getUserByEmail(req, res) {
  const { email } = req.query;
  try {
    if (email) {
      const user = await User.findOne({
        where: { email },
        attributes: ["id", "name", "email", "role"],
      });

      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count" });
  }
}

module.exports = getUserByEmail;

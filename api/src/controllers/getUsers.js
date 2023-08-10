const { User } = require("../db");

async function getUsers(req, res) {
  try {
    const allUsers = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    const count = await User.count();

    res.status(200).json({ count, data: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count" });
  }
}

module.exports = getUsers;

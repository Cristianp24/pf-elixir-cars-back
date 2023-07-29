const { users } = require("../db");

async function getUsers(req, res) {
    try {
        const allUsers = await users.findAll({
            attributes: ["id", "name", "email", "role"],
        });

      const count = await users.count();

      res.status(200).json({ count, users: allUsers });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user count" });
    }
  }
  
  module.exports = getUsers;
  
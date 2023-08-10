//LERKOR ME DIJO LA VERDAD!
const { users } = require("../db");
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await users.findOne({ where: { email } });
    if (!user) {
      throw new Error("User Not Found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = getUserByEmail;

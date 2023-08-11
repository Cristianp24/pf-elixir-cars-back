// const { User } = require("../db");

// async function getUsers(req, res) {
//   const { email } = req.query;
//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user by email" });
//   }
// }

// module.exports = getUsers;

const { User } = require("../db");

async function getUsers(req, res) {
  const { email } = req.query;

  // console.log(email);

  try {
    if (!email) {
      const users = await User.findAll();
      return res.status(200).json(users);
    }

    const user = await User.findOne({ where: { email } });
    // console.log(user);

    if (!user) {
      /* return res.status(404).json({ message: "User not found" }); */
      return res.status(200).json(null);
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user by email" });
  }
}

module.exports = getUsers;

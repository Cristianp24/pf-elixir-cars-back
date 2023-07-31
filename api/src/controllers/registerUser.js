// const { users } = require("../db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// async function registerUser(req, res) {
//   try {
//     const { name, email, password } = req.body;
//     console.log(name, email, password);
//     if (!(email && password && name)) {
//       res.status(400).send("Por favor llena todos los campos");
//     }
//     //formato de mail vailido
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).send("Email invalido");
//     }
//     //longitud del mail
//     if (email.length > 30) {
//       return res
//         .status(400)
//         .send("El email no puede tener mas de 30 caracteres");
//     }

//     const oldUser = await users.findOne({ where: { email } });

//     if (oldUser) {
//       return res
//         .status(409)
//         .send("El usuario ya existe, por favor incia sesion");
//     }

//     let encryptedPassword = await bcrypt.hash(password, 10);

//     // Create users in our database
//     const user = await users.create({
//       name,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedPassword,
//     });

//     const token = jwt.sign(
//       { user_id: user.id, email, name },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save users token
//     user.token = token;
//     await user.save();

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// module.exports = registerUser;


//-----------------------------------------------------------------------------//


const { users } = require("../db");
const bcrypt = require("bcryptjs");
const clerk = require("../../clerk");
// import { sessions } from '@clerk/clerk-sdk-node';
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      return res.status(400).send("Por favor llena todos los campos");
    }

    // Formato de mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Email inválido");
    }

    // Longitud del mail
    if (email.length > 30) {
      return res.status(400).send("El email no puede tener más de 30 caracteres");
    }

    const oldUser = await users.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("El usuario ya existe, por favor inicia sesión");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create users in our database
    const usuario = await users.create({
      name,
      email: email.toLowerCase(), // Sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Register user with Clerk
    // const { user, session } = await clerk.register(email, password);

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = registerUser;

<<<<<<< HEAD
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
=======
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!(email && password && name)) {
<<<<<<< HEAD
      return res.status(400).send("Por favor llena todos los campos");
    }

    // Formato de mail válido
=======
      return res.status(400).send("All input is required");
    }

    // Formato de email válido
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Email inválido");
    }

<<<<<<< HEAD
    // Longitud del mail
=======
    // Longitud del email
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
    if (email.length > 30) {
      return res.status(400).send("El email no puede tener más de 30 caracteres");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
<<<<<<< HEAD
      return res.status(409).send("El usuario ya existe, por favor inicia sesión");
=======
      return res.status(409).send("User Already Exists. Please Login");
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

<<<<<<< HEAD
    // Create users in our database
    const usuario = await users.create({
=======
    // Crear usuario en nuestra base de datos
    const user = await User.create({
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669
      name,
      email: email.toLowerCase(), // Sanitize: convert email to lowercase
      password: encryptedPassword,
      role: role, // Asignar el rol de acuerdo a role
    });

<<<<<<< HEAD
    // Register user with Clerk
    // const { user, session } = await clerk.register(email, password);
=======
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // Guardar el token del usuario
    user.token = token;
>>>>>>> 42e17e30a7f7cbd156a18ef2caf63f41dbc94669

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = registerUser;

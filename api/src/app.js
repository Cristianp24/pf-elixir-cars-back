// const express = require("express");
// const router = require("./routes/index");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// require("./db.js");

// const server = express();

// server.use(express.json());
// server.use(cookieParser());

// // Permitir solicitudes desde un dominio específico (por ejemplo, http://localhost:3000)
// const allowedOrigins = ["http://localhost:3000"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Permite el uso de cookies de terceros (necesario para enviar cookies desde el frontend)
// };

// server.use(cors(corsOptions));

// server.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// server.use("/", router);
// module.exports = server;

/////////////////////////////////////////////////////////////////////////

const express = require("express");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./db.js");

const server = express();

server.use(express.json());
server.use(cookieParser());

// Configuración de CORS para permitir solicitudes desde un dominio específico (por ejemplo, http://localhost:3000)
const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Permite el uso de cookies de terceros (necesario para enviar cookies desde el frontend)
};

server.use(cors(corsOptions));

server.use("/", router);
module.exports = server;

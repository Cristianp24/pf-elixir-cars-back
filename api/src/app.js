require("./db.js");
const express = require("express");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cookieParser());
sgMail.setApiKey(process.env.API_KEY);
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

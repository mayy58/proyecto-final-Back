const express = require("express");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");

require("dotenv").config();
const mainRouter = require("./routes/mainRouter.js");
const loginRouter = require("./routes/loginRouter");

require("./db.js");
const server = express();
server.use(express.json());

server.name = "API";

//middlewares-->antes de las rutas
server.use(express.urlencoded({ extended: true })); //como proceso y recibo los datos

server.use(cookieParser());
server.use(morgan("dev")); //muestro lo cliente me pide.lo necesito para saber que me esta pidiendo la app get post milisegundos etc
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes
server.use(mainRouter);
server.use("/", loginRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

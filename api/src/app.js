const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("./utils/passportConfig");
const session = require("express-session");

require("dotenv").config();
const mainRouter = require("./routes/mainRouter.js");

require("./db.js");
const server = express();
server.use(express.json());

server.name = "API";

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser(process.env.SECRET_key));
server.use(morgan("dev"));
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

server.use(
  session({
    secret: process.env.SECRET_key,
    resave: true,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(mainRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

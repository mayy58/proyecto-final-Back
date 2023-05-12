const { Router } = require("express");
const passport = require("../utils/passportConfig");

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.send("hola");
});
loginRouter.post(
  "/login",
  passport.authenticate("loguearse", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

loginRouter.get("/", (req, res) => {
  res.status(200).send("hola");
});
loginRouter.post(
  "/create",
  passport.authenticate("create", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

module.exports = loginRouter;

const { Router } = require("express");
const passport = require("../utils/passportConfig");

const loginRouter = Router();

loginRouter.post(
  "/login",
  passport.authenticate("loguearse", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
    failureFlash: true,
  })
);

loginRouter.get("/", (req, res) => {
  return res.redirect("/");
});
loginRouter.post(
  "/create",
  passport.authenticate("create", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
    failureFlash: true,
  })
);

module.exports = loginRouter;

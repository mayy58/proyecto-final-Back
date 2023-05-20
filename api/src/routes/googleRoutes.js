const { Router } = require("express");

const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const googleRouter = Router();

//googleRouter.get(
//  "/google",
//  passport.authenticate("auth-google", { scope: ["profile", "email"] })
//);

googleRouter.get("/google/redirect", async (req, res) => {
  try {
    const usergoogle = await req.user;
    const token = jwt.sign(
      {
        id: usergoogle.id,
        nickname: usergoogle.nickname,
        email: usergoogle.email,
        roll: usergoogle.roll,
      },
      process.env.SECRET_key,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      message: "Usuario creado con exito",
      email: usergoogle.email,
      nickname: usergoogle.nickname,
      token,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

googleRouter.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = googleRouter;

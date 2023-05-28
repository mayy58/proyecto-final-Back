const { Router } = require("express");

const jwt = require("jsonwebtoken");
const { user } = require("../db");
require("dotenv").config();
const googleRouter = Router();

//googleRouter.get(
//  "/google",
//  passport.authenticate("auth-google", { scope: ["profile", "email"] })
//);

googleRouter.get("/google/redirect", async (req, res) => {
  try {
    const usergoogle = req.user;

    const userGoogle = await user.findOne({
      where: { googleId: usergoogle.googleId},
    });


    const token = jwt.sign(
      {
        id: userGoogle?.id,
        nickname: userGoogle?.nickname,
        email: userGoogle?.email,
        roll: userGoogle?.roll,
      },
      process.env.SECRET_key,
      {
        expiresIn: "7d",
      }
    );

    const tokenExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
    // return res.status(200).json({
    //   message: "Usuario creado con exito",
    //   email: usergoogle.email,
    //   nickname: usergoogle.nickname,
    //   token,
    //   exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    // });
    const redirectURL = `http://localhost:5173/loginGoogle?token=${encodeURIComponent(token)}&tokenExpiration=${encodeURIComponent(tokenExpiration)}&email=${encodeURIComponent(userGoogle?.email)}&username=${encodeURIComponent(userGoogle?.nickname)}&roll=${encodeURIComponent(userGoogle?.roll)}`;
    res.redirect(redirectURL)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor", message: error.message });
  }
});

module.exports = googleRouter;

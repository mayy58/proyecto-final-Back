const { Router } = require("express");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const googleRouter = Router();

//googleRouter.get(
//  "/google",
//  passport.authenticate("auth-google", { scope: ["profile", "email"] })
//);

googleRouter.get("/google/redirect", async (req, res) => {
  try {
    const usergoogle = await req.user;

    const userGoogle = await user.findOne({
      where: { email: usergoogle.emails[0].value },
    });

    const token = jwt.sign(
      {
        id: usergoogle.id,
        nickname:
          usergoogle.displayName || usergoogle.emails[0].value.split("@")[0],
        email: usergoogle.emails[0].value,
        roll: userGoogle.roll,
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
    const redirectURL = `http://localhost:5173/loginGoogle?token=${encodeURIComponent(
      token
    )}&tokenExpiration=${encodeURIComponent(
      tokenExpiration
    )}&email=${encodeURIComponent(
      usergoogle.emails[0].value
    )}&username=${encodeURIComponent(
      usergoogle.displayName || usergoogle.emails[0].value.split("@")[0]
    )}&roll=${encodeURIComponent(userGoogle.roll)}`;
    res.redirect(redirectURL);
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

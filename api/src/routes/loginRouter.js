const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.KEY_SENDGRID);

require("dotenv").config();
const { user } = require("../db");

const loginRouter = Router();

loginRouter.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  try {
    const User = await user.findOne({ where: { nickname: nickname } });
    const passwordMatch = User
      ? await bcrypt.compare(password, User.password)
      : false;
    if (!User || !passwordMatch) {
      return res
        .status(401)
        .json({ message: `Nickname o Password incorrecto` });
    } else {
      const token = jwt.sign(
        {
          id: User.id,
          nickname: User.nickname,
          email: User.email,
          roll: User.roll,
        },
        process.env.SECRET_key,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).json({
        email: User.email,
        nickname: User.nickname,
        address: User.address,
        email: User.email,
        token,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

loginRouter.post("/create", async (req, res) => {
  const {
    picture,
    email,
    password,
    name,
    lastName,
    birthDate,
    address,
    nickname,
    roll,
  } = req.body;
  try {
    const existEmail = await user.findOne({ where: { email: email } });

    if (existEmail) {
      return res
        .status(401)
        .json({ message: "El correo electrónico ya tiene una cuenta." });
    }

    const existNickName = await user.findOne({ where: { nickname: nickname } });

    if (existNickName) {
      return res.status(401).json({
        message: "Este nickname ya está en uso. Por favor, elija otro.",
      });
    }

    const usernew = await user.create({
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      birthDate: birthDate,
      address: address,
      nickname: nickname,
      picture: picture,
      roll: roll,
    });

    const msg = {
      to: `${usernew.email}`, // Change to your recipient
      from: `tukimarket.contacto@gmail.com`, // Change to your verified sender
      subject: "Bienvenido a TukiMarket",
      text: `Hola! ${usernew.name} Bienvenido a TukiMarket!`,
      html: `<strong>Hola ${usernew.name} Gracias por registrarte en nuestra pagina</strong>`,
    };

    sgMail
      .send(msg)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    const token = jwt.sign(
      {
        id: usernew.id,
        nickname: usernew.nickname,
        email: usernew.email,
        roll: usernew.roll,
      },
      process.env.SECRET_key,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      message: "Usuario creado con exito.",
      nickname: usernew.nickname,
      email: usernew.email,
      address: usernew.address,
      picture: usernew.picture,
      token,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

loginRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await user.findOne({ where: { email: email } });
    if (!existUser) {
      return res
        .status(404)
        .json({ error: "El correo electrónico no está registrado" });
    }

    const token = jwt.sign({ email: existUser.email }, process.env.SECRET_key, {
      expiresIn: "1h",
    });
    user.resetPasswordToken = token;

    await user.save();

    const resetPasswordUrl = `http://localhost:3001/user/reset-password/${token}`;

    const message = {
      to: `${existUser.email}`,
      from: "tukimarket.contacto@gmail.com",
      subject: "Recuperación de contraseña",
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetPasswordUrl}`,
    };

    sgMail
      .send(message)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    return res.json({
      message:
        "Se ha enviado un correo electrónico para restablecer su contraseña",
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

loginRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const existUser = await user.findOne({
      where: { resetPasswordToken: token },
    });

    if (!existUser) {
      return res.status(400).json({
        message:
          "El token de restablecimiento de contraseña es inválido o ha expirado",
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_key);

    if (decodedToken.email !== existUser.email) {
      return res.status(400).json({
        message: "El token de restablecimiento es inválido",
      });
    }

    existUser.password = password;
    existUser.resetPasswordToken = null;
    await existUser.save();

    return res.json({ message: "Contraseña restablecida exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

module.exports = loginRouter;

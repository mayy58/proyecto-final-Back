const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        mail: User.mail,
        nickname: User.nickname,
        address: User.address,
        token,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

loginRouter.post("/create", async (req, res) => {
  const { email, password, name, lastName, birthDate, address, nickname } =
    req.body;
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
      token,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

loginRouter.get("/forgot-password", (req, res, next) => {});

loginRouter.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  try {
    const existEmail = await user.findOne({ where: { email: email } });

    if (!existEmail) {
      return res
        .status(401)
        .json({ message: "El correo electrónico no está registrado." });
    } else {
      //si esta registrado, creo un link por 15min para restablecer la contraseña
      const secret = process.env.SECRET_key + user.password;
      const payload = {
        email: user.email,
        id: user.id,
      };

      const token15 = jwt.sign(payload, secret, {
        expiresIn: "15m",
      });
      const link = `http://localhost:3001/user/reset-password/${user.id}/${token15}`;
      console.log(link);
      res.send(200).json({
        message: "Email para reseatear su contraseña ha sido enviado.",
      });
    }
  } catch (error) {}
});

loginRouter.get("/reset-password/:id/:token15", (req, res, next) => {
  const { id, token15 } = req.params;
});

loginRouter.post("/reset-password", (req, res, next) => {});

module.exports = loginRouter;

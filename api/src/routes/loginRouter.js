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
        { id: User.id, nickname: User.nickname },
        process.env.SECRET_key,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).json({
        nickname: User.nickname,
        token,
        exp: Date.now() + (10 * 60 * 1000)
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
      { id: usernew.id, nickname: usernew.nickname },
      process.env.SECRET_key,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      message: "Usuario Creado con exito",
      id: usernew.id,
      nickname: usernew.nickname,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = loginRouter;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { user } = require("../db");
const { where } = require("sequelize");
//funcion para saber si estoy enviando un token, si pasa esta funcion
//continua el camino de la ruta

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "Usuario sin token" });

    //desgloso el token
    const decoded = jwt.verify(token, process.env.SECRET_key);
    req.userId = decoded.id;
    //con la decodificacion del token obtego el id del usuario
    const userMatch = await user.findById(req.userId);
    if (!userMatch)
      return res.status(404).json({ message: "El usuario no exite" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado." });
  }
};

const isSeller = async (req, res, next) => {
  const userRoll = await user.findById(req.userId);
  if (userRoll && userRoll.roll === "SELLER") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Requiere Seller roll." });
  }
};

const isAdmin = async (req, res, next) => {
  const adminRoll = await user.findById(req.userId);
  if (adminRoll && adminRoll.roll === "ADMIN") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Requiere Admin Roll." });
  }
};

module.exports = { verifyToken, isSeller, isAdmin };

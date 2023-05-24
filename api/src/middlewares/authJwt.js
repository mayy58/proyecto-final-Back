const jwt = require("jsonwebtoken");
require("dotenv").config();
const { user } = require("../db");

//funcion para saber si estoy enviando un token, si pasa esta funcion
//continua el camino de la ruta

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "Usuario sin token" });

    //desgloso el token
    const decoded = jwt.verify(token, process.env.SECRET_key, { password: 0 });

    req.userId = decoded.id;
    //con la decodificacion del token obtego el id del usuario
    const userMatch = await user.findByPk(req.userId);

    if (!userMatch)
      return res.status(404).json({ message: "El usuario no exite" });

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const isSeller = async (req, res, next) => {
  const userRoll = await user.findByPk(req.userId);
  if (userRoll && userRoll.roll === "SELLER") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Requiere Seller roll." });
  }
};

const isAdmin = async (req, res, next) => {
  const adminRoll = await user.findByPk(req.userId);
  if (adminRoll && adminRoll.roll === "ADMIN") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Requiere Admin Roll." });
  }
};

const isSuperAdmin = async (req, res, next) => {
  const supAdRoll = await user.findByPk(req.userId);
  if (supAdRoll && supAdRoll.roll === "SUPERADMIN") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Requiere SuperAdmin Roll." });
  }
};

module.exports = { verifyToken, isSeller, isAdmin, isSuperAdmin };

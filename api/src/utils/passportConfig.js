const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const PassportJwt = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
require("dotenv").config();
const { user } = require("../db");

passport.use(
  "loguearse",
  new PassportLocal(
    {
      usernameField: "nickname",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, nickname, password, done) => {
      try {
        const nick = await user.findOne({ where: { nickname: nickname } });
        if (!nick) {
          return done(null, false, { message: `${nickname} incorrecto` });
        }
        const passwordMatch = await bcrypt.compare(password, nick.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, nick);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const nick = await user.findByPk(id);
    done(null, nick);
  } catch (error) {
    done(error);
  }
});

passport.use(
  "create",
  new PassportLocal(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name, lastName, birthDate, address } = req.body;
      try {
        const usernew = await user.create({
          email: email,
          password: password,
          name: name,
          lastName: lastName,
          birthDate: birthDate,
          address: address,
        });
        return done(null, usernew);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usernew, done) => {
  done(null, usernew.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const nick = await user.findByPk(id);
    done(null, nick);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new PassportJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_key,
    },
    async (payload, done) => {
      try {
        const usuario = await user.findByPk(payload.sub);
        if (!usuario) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;

//Uso de Passport en tus rutas: En tus rutas o controladores, puedes utilizar Passport para
//proteger las rutas que requieren autenticación. Por ejemplo:
//const express = require('express');
//const passport = require('passport');
//const router = express.Router();
//
//// Ruta protegida que requiere autenticación
//router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//  res.send('Perfil del usuario');
//});
//
//// Ruta de inicio de sesión utilizando la estrategia local
//router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
//  // Autenticación exitosa, se puede generar un token JWT y enviar en la respuesta
//

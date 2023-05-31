const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { user } = require("../db");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.KEY_SENDGRID);
require("dotenv").config();

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existEmail = await user.findOne({
          where: { email: profile.emails[0].value },
        });
        if (existEmail) {
          done(null, profile);
        } else {
          const googleIdString = profile.id.toString();
          const newuser = await user.create({
            googleId: googleIdString,
            email: profile.emails[0].value,
            nickname:
              profile.displayName || profile.emails[0].value.split("@")[0],
            name: profile.name.givenName,
            lastName: profile.name.familyName
              ? profile.name.familyName
              : profile.name.givenName,
            picture: profile.photos[0].value || null,
          });

          const msg = {
            to: `${newuser.email}`, // Change to your recipient
            from: `tukimarket.contacto@gmail.com`, // Change to your verified sender

            subject: "Bienvenido a TukiMarket",
            text: `Hola! ${newuser.name} Bienvenido a TukiMarket!`,
            html: `<strong>Hola ${newuser.name} Gracias por registrarte en nuestra página</strong>`,
          };

          sgMail
            .send(msg)
            .then((response) => {})
            .catch((error) => {
              console.error(error);
            });

          done(null, newuser);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        done(error);
      }
    }
  )
);
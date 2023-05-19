const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { user } = require("../db");
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
            lastName: profile.name.familyName,
          });
          console.log(`Usuario creado exitosamente ` + newuser);
          done(null, newuser);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        done(error);
      }
    }
  )
);

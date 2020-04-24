//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;

//We will need the models folder to check password validity
var db = require("../models");

// Telling passport we want to use a Local Strategy.
passport.use(new LocalStrategy(
  // Our user will sign in using an email
  {
    usernameField: "email"
  },
  function (email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// Adding JWT strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: (req) => {
        return req.headers.authorization.split(" ")[1];
      },
      secretOrKey: "transmision vampire",
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done("jwt expired");
      }
      return done(null, jwtPayload);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  app.post("/login", passport.authenticate("local"), function (req, res) {

    // This is what ends up in our JWT
    const payload = {
      email: req.user.email,
      id: req.user.id,
      expires: Date.now() + 900000,
    };

    /** assigns payload to req.user */
    req.login(payload, {session: false}, (error) => {
      if (error) {
        res.status(400).send({ error });
      }

      /** generate a signed json web token and return it in the response */
      const token = jwt.sign(JSON.stringify(payload), "transmision vampire"); // add a secret

      /** assign our jwt to the cookie */
      // res.cookie('jwt', token, { httpOnly: true, secure: true });
      res.status(200).json({
        email: req.user.email,
        id: req.user.id,
        jwt: token
      });
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely
  app.post("/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/login");
    }).catch(function (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res
          .status(200)
          .json({ error: "An account with this Email already exists!" });
      } else {
        res
          .status(409)
          .json({});
      }
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/user_data",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      // const { user } = req;

      // res.status(200).send({ user });
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  );
};

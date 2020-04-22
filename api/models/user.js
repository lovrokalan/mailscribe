// Requiring bcrypt for password hashing.
var bcrypt = require("bcrypt-nodejs");

// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null, minimum 5 characters long
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, Infinity],
          msg: "Password must be at least 5 characters long!"
        }
      }
    }
  });

  //  Creating a custom method for our User model. 
  //  This will check if an unhashed password entered by the 
  //  user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // before a User is created -> automatically hash their password
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};

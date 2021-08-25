//Login User
const STRINGS = require("../utils/texts");
const response = require("../utils/response");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const ENV = process.env;

// register user
exports.Register = async (req, res) => {
  try {
    const data = req.body;
    let user = await User.findOne({ email: data.email }); // check if user already exists
    if (user) res.status(400).send(response(STRINGS.ERRORS.userExists, {}));
    else {
      const hash = await bcrypt.hash(data.password, +ENV.BCRYPT_SALT); // hashing password
      data.password = hash;
      user = await new User(data).save(); //user saved
      res.status(200).send(response(STRINGS.TEXTS.userCreated, user));
    }
  } catch (err) {
    res.send(response(err.message, 400));
  }
};
// login user
exports.Login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email }); // Check if user exist
    if (!user) res.status(400).send(response(STRINGS.ERRORS.emailInvalid));
    const isCorrect = await bcrypt.compare(data.password, user.password); // Check if user password is correct
    if (!isCorrect)
      res.status(400).send(response(STRINGS.ERRORS.passwordInvalid, user));
    const token = await JWT.sign(
      { id: user._id, role: user.role },
      ENV.JWT_SECRET
    ); //token generation

    const result = {
      user,
      token,
    };
    res.status(200).send(response(STRINGS.TEXTS.loginSuccess, result));
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};

// Init
const router = require("express").Router();
const { Register, Login } = require("../controllers/auth.js");
const {
  registerUserValidator,
  loginUserValidator,
  isValidated,
} = require("../middleware/validators");

// Routes
// register user
router.post("/register", registerUserValidator, isValidated, Register);
// login user
router.post("/login", loginUserValidator, isValidated, Login);

// Export
module.exports = router;

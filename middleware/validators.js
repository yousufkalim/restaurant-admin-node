// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// user register Validation
exports.registerUserValidator = [
  check("firstName", "firstName is required.").notEmpty().trim(),
  check("lastName", "lastName is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("min length must be 6 characters"),
  check("phone", "Phone is required.").notEmpty().trim(),
];

// user login Validation
exports.loginUserValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("min length must be 6 characters"),
];
// restaurant register Validation
exports.registerRestaurantValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("min length must be 6 characters"),
  check("restaurant_name", "Restaurant name is required.").notEmpty().trim(),
  check("restaurant_desc", "Restaurant description is required.")
    .notEmpty()
    .trim(),
  check("restaurant_lat", "Restaurant latitude is required.").notEmpty().trim(),
  check("restaurant_lng", "Restaurant longitude is required.")
    .notEmpty()
    .trim(),
  check("restaurant_city", "Restaurant city is required.").notEmpty().trim(),

  check("restaurant_address", "Restaurant address is required.")
    .notEmpty()
    .trim(),
  check("restaurant_zipCode", "Restaurant zipCode is required.")
    .notEmpty()
    .trim(),
];

// restaurant update Validation
exports.registerRestaurantValidator = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),

  check("restaurant_name", "Restaurant name is required.").notEmpty().trim(),
  check("restaurant_desc", "Restaurant description is required.")
    .notEmpty()
    .trim(),
  check("restaurant_lat", "Restaurant latitude is required.").notEmpty().trim(),
  check("restaurant_lng", "Restaurant longitude is required.")
    .notEmpty()
    .trim(),
  check("restaurant_city", "Restaurant city is required.").notEmpty().trim(),

  check("restaurant_address", "Restaurant address is required.")
    .notEmpty()
    .trim(),
  check("restaurant_zipCode", "Restaurant zipCode is required.")
    .notEmpty()
    .trim(),
];
// Example Validation
exports.validateExample = [
  check("name", "Name is required.").notEmpty().trim(),
  check("cnic", "CNIC is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("gender", "Gender is required.").notEmpty(),
  check("role", "Role is required.").notEmpty(),
  check("number", "Number is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg;
    res.status(400).send({ message: message });
  } else {
    next();
  }
};

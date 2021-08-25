//Login User
const STRINGS = require("../utils/texts");
const response = require("../utils/response");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Restaurant = require("../models/restaurant");
const ENV = process.env;

// register restaurant
exports.Create = async (req, res) => {
  try {
    const data = req.body;

    let restaurant = await Restaurant.findOne({ email: data.email }); // check if restaurant already exists
    if (restaurant)
      res.status(400).send(response(STRINGS.ERRORS.restaurantExists, {}));
    var uploaded_Picture = "";
    if (!req.file) {
      return res.send(response("Restaurant image is required", 400));
    }
    uploaded_Picture = req.file.filename; //file
    const hash = await bcrypt.hash(data.password, +ENV.BCRYPT_SALT); // hashing password
    data.password = hash;
    data.restaurant_image = uploaded_Picture;

    restaurant = await new Restaurant(data).save(); //restaurant saved
    res.status(200).send(response(STRINGS.TEXTS.restaurantCreated, restaurant));
  } catch (err) {
    res.send(response(err.message, 400));
  }
};
// login restaurant
exports.Login = async (req, res) => {
  try {
    const data = req.body;
    const restaurant = await Restaurant.findOne({ email: data.email }); // Check if restaurant exist
    if (!restaurant)
      res.status(400).send(response(STRINGS.ERRORS.emailInvalid));
    const isCorrect = await bcrypt.compare(data.password, restaurant.password); // Check if restaurant password is correct
    if (!isCorrect)
      res
        .status(400)
        .send(response(STRINGS.ERRORS.passwordInvalid, restaurant));
    const token = await JWT.sign(
      { id: restaurant._id, role: restaurant.role },
      ENV.JWT_SECRET
    ); //token generation

    const result = {
      restaurant,
      token,
    };
    res.status(200).send(response(STRINGS.TEXTS.loginSuccess, result));
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};

// update restaurant
exports.Update = async (req, res) => {
  try {
    const {
      restaurant_name,
      restaurant_desc,
      email,
      password,
      restaurant_lat,
      restaurant_lng,
      restaurant_city,
      restaurant_image,
      restaurant_address,
      restaurant_zipCode,
    } = req.body;

    let id = req.params.id; //restaurant id
    let restaurant = await Restaurant.findById(id); // check if restaurant  exists
    if (restaurant) {
      var uploaded_Picture = restaurant_image;
      if (req.file) {
        uploaded_Picture = req.file.filename; //file
      }
      restaurant = await Restaurant.findByIdAndUpdate(id, {
        restaurant_name,
        restaurant_desc,
        email,
        password,
        restaurant_lat,
        restaurant_lng,
        restaurant_city,
        restaurant_image: uploaded_Picture,
        restaurant_address,
        restaurant_zipCode,
      }); //restaurant updated
      res
        .status(200)
        .send(response(STRINGS.TEXTS.restaurantUpdated, restaurant));
    } else {
      res.status(400).send(response(STRINGS.ERRORS.restaurantNotFound, {}));
    }
  } catch (err) {
    res.send(response(err.message, 400));
  }
};
// get active restaurant

exports.getActiveRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      status: STRINGS.STATUS.ACTIVE,
    });
    res.status(200).send(response(STRINGS.TEXTS.loginSuccess, restaurants));
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};
// get deactive restaurant

exports.getDeactiveRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      status: STRINGS.STATUS.INACTIVE,
    });
    res.status(200).send(response(STRINGS.TEXTS.loginSuccess, restaurants));
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};
// delete restaurant
exports.DeleteRestaurant = async (req, res) => {
  try {
    let id = req.params.id; //restaurant id
    let restaurant = await Restaurant.findById(id); // check if restaurant  exists
    if (restaurant) {
      const restaurants = await Restaurant.findByIdAndDelete(id); //restaurant deleted
      res
        .status(200)
        .send(response(STRINGS.TEXTS.restaurantDeleted, restaurants));
    } else {
      res.status(400).send(response(STRINGS.ERRORS.restaurantNotFound, {}));
    }
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};

// restaurant activate/deactivate
exports.ActivationAccount = async (req, res) => {
  try {
    let id = req.params.id; //restaurant id
    let status = req.body.status;
    let restaurant = await Restaurant.findById(id); // check if restaurant  exists
    if (restaurant) {
      restaurant = await Restaurant.findByIdAndUpdate(id, {
        status: status,
      });
      res
        .status(200)
        .send(response(STRINGS.TEXTS.restaurantDeactivate, restaurant));
    } else {
      res.status(400).send(response(STRINGS.ERRORS.restaurantNotFound, {}));
    }
  } catch (error) {
    res.status(400).send(response(error.message, []));
  }
};

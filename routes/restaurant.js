// Init
const router = require("express").Router();

const {
  Create,
  Login,
  Update,
  getActiveRestaurants,
  getDeactiveRestaurants,
  DeleteRestaurant,
  ActivationAccount,
} = require("../controllers/restaurant.js");
const auth = require("../middleware/auth");

const {
  registerRestaurantValidator,
  loginUserValidator,
  isValidated,
} = require("../middleware/validators");
const { upload } = require("../middleware/multer");
const STRINGS = require("../utils/texts");
// Routes
// register restaurant
router.post(
  "/create",
  auth(STRINGS.ROLES.ADMIN),
  upload.single("restaurant_image"),
  registerRestaurantValidator,
  isValidated,

  Create
);
// login restaurant
router.post(
  "/login",
  auth(STRINGS.ROLES.ADMIN),

  loginUserValidator,
  isValidated,
  Login
);
// get active restaurants
router.get("/active", auth(STRINGS.ROLES.ADMIN), getActiveRestaurants);
// get deactive restaurants
router.get("/deactive", auth(STRINGS.ROLES.ADMIN), getDeactiveRestaurants);

// update restaurant
router.put(
  "/update/:id",
  auth(STRINGS.ROLES.ADMIN),
  upload.single("restaurant_image"),
  registerRestaurantValidator,
  isValidated,

  Update
);
// restaurant activate/deactivate

router.put("/activation/:id", auth(STRINGS.ROLES.ADMIN), ActivationAccount);

// delete restaurant
router.delete(
  "/delete/:id",
  auth(STRINGS.ROLES.ADMIN),

  DeleteRestaurant
);

// Export
module.exports = router;

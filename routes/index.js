// Init
const router = require("express").Router();

// All Routes
router.use("/auth", require("./auth"));
router.use("/restaurant", require("./restaurant"));

// Export
module.exports = router;

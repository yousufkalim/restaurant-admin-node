const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  restaurant_name: { type: String, unique: true, required: true },
  restaurant_desc: { type: String },
  restaurant_lat: { type: Number, required: true },
  restaurant_lng: { type: Number, required: true },
  restaurant_city: { type: String },
  restaurant_image: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  restaurant_address: { type: String },
  restaurant_zipCode: { type: String },
  status: {
    type: String,
    enum: [STRINGS.STATUS.ACTIVE, STRINGS.STATUS.INACTIVE],
    default: STRINGS.STATUS.ACTIVE,
  },
});

module.exports = mongoose.model("Restaurant", schema);

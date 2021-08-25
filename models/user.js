const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    password: String,
    image: String,
    phone: String,
    email: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: [STRINGS.ROLES.USER, STRINGS.ROLES.ADMIN],
      default: STRINGS.ROLES.ADMIN,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(STRINGS.MODALS.USER, userSchema);

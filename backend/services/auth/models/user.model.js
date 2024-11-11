// src/services/user/models/user.model.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    ifnote: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        "admin",
        "manager",
        "store keeper",
        "supplier",
        "customer",
        "subscriber",
      ],
      default: "subscriber",
    },
    access: [],
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;

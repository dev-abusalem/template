const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = () => {
  mongoose
    .connect(process.env.MONGO_URI_LIVE)
    .then(() => console.log("Mongo DB is connected"))
    .catch((err) => console.log(err));
};
module.exports = { db };

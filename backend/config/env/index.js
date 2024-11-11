const dotenv = require("dotenv");
dotenv.config();
const BASE_URL_CLIENT =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_LIVE
    : process.env.CLIENT_URL_DEV;

// server url
const BASE_URL_SERVER =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL_LIVE
    : process.env.SERVER_URL_DEV;
module.exports = { BASE_URL_SERVER, BASE_URL_CLIENT };
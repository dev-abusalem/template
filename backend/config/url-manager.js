// url-manager.js
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://xfront-server-blond.vercel.app"
    : "http://localhost:5000";

// server
const BASE_URL_CLIENT =
  process.env.NODE_ENV === "production"
    ? "https://xfront-client-gamma.vercel.app"
    : "http://localhost:3000";

module.exports = { BASE_URL, BASE_URL_CLIENT };

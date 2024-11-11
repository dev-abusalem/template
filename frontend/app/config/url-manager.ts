// url-manager.js
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://xfront-server-blond.vercel.app"
    : "http://localhost:5050";

// server
export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://xfront-client-gamma.vercel.app"
    : "http://localhost:3000";

export const TOKEN_FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "xfront-client-gamma.vercel.app"
    : "localhost:3000";

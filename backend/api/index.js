const http = require("http");
const dotenv = require("dotenv");
const { db } = require("../config/database");

dotenv.config();

// Import the app from app.js
const app = require("./app");

// Create the HTTP server using the express app
const server = http.createServer(app);

// Connect to the database
db();

// Run the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

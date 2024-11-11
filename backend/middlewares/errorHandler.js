// errorMiddleware.js

const AppError = require("../utils/error/AppError");

const errorHandler = (err, req, res, next) => {
  // Default status code and message for unexpected errors
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  console.log(`Error Status Code: ${statusCode}`);
  console.log(`Error Message: ${message}`);

  // If the error is an instance of AppError, use its properties
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = errorHandler;
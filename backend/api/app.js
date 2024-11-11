const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Import routes start
const authRouter = require("../services/auth/index");

// Routes end
const { BASE_URL_CLIENT } = require("../config/url-manager");
const errorHandler = require("../middlewares/errorHandler");
const { createRouteHandler } = require("uploadthing/express");
const { uploadRouter } = require("../libs/uploadthing.js");

dotenv.config();

// Initialize express
const app = express();

// Use morgan for logging requests
app.use(morgan("combined"));

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    frameguard: { action: "deny" },
    noSniff: true,
    referrerPolicy: { policy: "no-referrer" },
  })
);

// Parse cookies
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable CORS
app.use(
  cors({
    origin: BASE_URL_CLIENT,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// default route
app.get("/api", (req, res) => {
  res.send("Working");
});

app.use(`/api/${process.env.VERSION}/auth`, authRouter);

// amzon s3
// app.use(`/api/${process.env.VERSION}/amazon`, amazonRouter);

// Global error handling middleware
app.use(errorHandler);

// Upload thing
app.use(
  `/api/${process.env.VERSION}/upload-image`,
  createRouteHandler({
    router: uploadRouter,
    config: {
      upload: {
        maxFileSize: "4MB",
        maxFileCount: 10,
      },
    },
  })
);

// Export the app instance to be used in index.js
module.exports = app;

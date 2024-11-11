const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config(); // Load AWS credentials from .env file

// Initialize S3 client
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure multer to upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Create unique file name
    },
  }),
});

// Function to list all files in the bucket
const listFiles = async () => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  };
  return s3.listObjectsV2(params).promise();
};

// Export the S3 upload middleware and file listing function
module.exports = {
  upload,
  listFiles,
};

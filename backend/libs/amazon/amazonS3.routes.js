const router = require("express").Router();
const { upload, listFiles } = require("./amzonS3"); // Import the S3 functions

// Route to upload a file
router.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully!",
    fileLocation: req.file.location, // S3 file URL
  });
});

// Route to list all files from the S3 bucket
router.get("/files", async (req, res) => {
  try {
    const data = await listFiles();
    const fileUrls = data.Contents.map((item) => {
      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
    });

    res.status(200).json({
      message: "Files retrieved successfully",
      files: fileUrls,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

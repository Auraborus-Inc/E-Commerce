const database = require('../databseConnectivity');
const multer = require('multer');
const path = require('path');

// -------------------- Multer Config --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage: storage });

// -------------------- Image update --------------------
exports.uploadProductImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      // const { productName: productName } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // if (!productName) {
      //   return res.status(400).json({ message: "No productId provided" });
      // }

      // Path to save in DB
      const imagePath = `/uploads/${req.file.filename}`;

      // Update product record
      // const updated = await database("productsIndustryStands")
      //   .where({ name: productName })
      //   .update({ image_url: imagePath, updated_at: new Date() });

      // if (!updated) {
      //   return res.status(404).json({ message: "Product not found" });
      // }

      res.status(200).json({
        message: "Image uploaded successfully",
        imagePath,
        status: 200 
      });
    } catch (error) {
      console.error("Error uploading & saving product image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
];

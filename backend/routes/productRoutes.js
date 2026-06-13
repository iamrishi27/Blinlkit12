const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const {
  addProduct,
  getProducts,
  deleteProduct
} = require("../controllers/productController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getProducts);

router.post(
  "/add",
  auth,
  admin,
  upload.single("image"),
  addProduct
);

router.delete(
  "/:id",
  auth,
  admin,
  deleteProduct
);

module.exports = router;
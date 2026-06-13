const router = require("express").Router();

const {
  register,
  login
} = require("../controllers/userController");

const {
  addUserProduct,
  getMyProducts,
  getAllUsersProducts
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/register", register);

router.post("/login", login);

router.post("/products/add", auth, addUserProduct);

router.get("/products", auth, getMyProducts);

router.get("/products/all", auth, admin, getAllUsersProducts);

module.exports = router;
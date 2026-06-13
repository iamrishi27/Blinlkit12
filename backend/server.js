require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// serve uploaded files
app.use("/uploads", express.static("uploads"));

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.get("/", (req, res) => {
  res.send(
    "Backend Running Successfully"
  );
});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server Running on Port ${process.env.PORT}`
    );
  }
);
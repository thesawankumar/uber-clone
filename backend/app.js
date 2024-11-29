const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);

module.exports = app;

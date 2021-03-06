const express = require("express");
const db = require("./db/models/");
const ingredientRoutes = require("./routes/ingredients");
const categoryRoutes = require("./routes/categories");
const recipeRoutes = require("./routes/recipes");
const cors = require("cors");
const app = express();
const path = require("path");

// Middleware
console.log("__dirname", __dirname);
app.use(cors());
app.use(express.json());

app.use("/ingredients", ingredientRoutes);
app.use("/categories", categoryRoutes);
app.use("/recipes", recipeRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Path Not Found!",
  };
  next(error);
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);

//yarn add cors sequelize sequelize-cli pg pg-hstore multer

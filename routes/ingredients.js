const express = require("express");
const {
  ingredientList,
  fetchIngredient,
} = require("../controllers/ingredientControllers");
const { Ingredient } = require("../db/models");
const upload = require("../middleware/multer.js");
const router = express.Router();

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    next({
      status: 404,
      message: "Ingredient Not Found",
    });
  }
});

router.get("/", ingredientList);

module.exports = router;

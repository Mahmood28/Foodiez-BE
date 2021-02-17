const express = require("express");
const {
  recipeList,
  recipeCreate,
  fetchRecipe,
  recipeLink,
} = require("../controllers/recipeControllers.js");
const { Recipe } = require("../db/models");
const upload = require("../middleware/multer.js");
const router = express.Router();

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({
      status: 404,
      message: "Recipe Not Found",
    });
  }
});

router.get("/", recipeList);

router.post("/", recipeCreate);

module.exports = router;

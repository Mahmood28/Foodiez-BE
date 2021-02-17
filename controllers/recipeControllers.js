const db = require("../db/models/");
const { Recipe, Ingredient, Recipe_Ingredients } = require("../db/models");

const saveImage = (req) => {
  if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
};

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId);
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
        as: "ingredients",
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body[0]);
    const Link = req.body[1].map((ingredientId) => {
      return {
        IngredientId: ingredientId,
        RecipeId: newRecipe.id,
      };
    });
    Link.map(async (link) => await Recipe_Ingredients.create(link));
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

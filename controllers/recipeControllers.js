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
    await newRecipe.addIngredients(
      req.body[1].map((ingredient) => ingredient.id)
    );
    res.status(201).json({
      name: newRecipe.name,
      ingredients: req.body[1],
    });
  } catch (error) {
    next(error);
  }
};

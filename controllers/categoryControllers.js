const { Category, Ingredient } = require("../db/models");

const saveImage = (req) => {
  if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
};

exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    saveImage(req);
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    saveImage(req);
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

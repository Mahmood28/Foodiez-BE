const Recipe = require("./Recipe");

module.exports = (sequelize) => {
  const Recipe_Ingredients = sequelize.define(
    "Recipe_Ingredients",
    {},
    { timestamps: false }
  );
  return Recipe_Ingredients;
};

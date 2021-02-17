const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};

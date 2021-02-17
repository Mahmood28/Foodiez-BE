const express = require("express");
const {
  categoryList,
  categoryCreate,
  ingredientCreate,
  fetchCategory,
} = require("../controllers/categoryControllers");
const { Category } = require("../db/models");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    next({
      status: 404,
      message: "Category Not Found",
    });
  }
});

router.get("/", categoryList);

router.post("/", upload.single("image"), categoryCreate);

router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

module.exports = router;

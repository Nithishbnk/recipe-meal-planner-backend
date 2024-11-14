const express = require("express");
const {
  createRecipe,
  getRecipes,
  getExternalRecipes,
} = require("../controllers/recipeController");

const router = express.Router();

// Route for creating a recipe
router.post("/", createRecipe);

// Route for getting all recipes from DB
router.get("/", getRecipes);

// Route for getting recipes from external API
router.get("/external", getExternalRecipes);

module.exports = router;

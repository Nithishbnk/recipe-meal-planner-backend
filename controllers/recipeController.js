const Recipe = require("../models/recipeModel");
const axios = require("axios");

exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe", error });
  }
};

// Fetch recipes from our database
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes", error });
  }
};

const normalizeRecipe = (externalRecipe) => {
  return {
    title: externalRecipe.title || "Unknown Title",
    ingredients: externalRecipe.extendedIngredients
      ? externalRecipe.extendedIngredients.map((ing) => ing.original)
      : ["Unknown Ingredients"],
    instructions: externalRecipe.instructions || "No instructions provided",
    createdAt: new Date(),
  };
};

// Fetch recipes from external API and normalize data
exports.getExternalRecipes = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query: req.query.query, // Get search term from request
          apiKey: process.env.SPOONACULAR_API_KEY,
          addRecipeInformation: true, // Get full recipe information
        },
      }
    );

    // Map and normalize each external recipe to match our database schema
    const externalRecipes = response.data.results.map(normalizeRecipe);

    res.status(200).json(externalRecipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving external recipes", error });
  }
};

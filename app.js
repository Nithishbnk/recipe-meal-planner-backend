const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/recipes", recipeRoutes);

module.exports = app;

// routes/userRoutes.js
const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser); // Add a new user
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get user by ID

module.exports = router;

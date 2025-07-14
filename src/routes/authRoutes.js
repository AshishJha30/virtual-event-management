const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// POST /register - User registration
router.post("/register", register);

// POST /login - User login
router.post("/login", login);

module.exports = router;

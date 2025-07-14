const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../../data");
const { validateRegistration, validateLogin } = require("../utils/validation");

// POST /register - User registration
const register = async (req, res) => {
  try {
    const { name, email, password, role = "attendee" } = req.body;

    // Validate input
    const validationError = validateRegistration(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: hashedPassword,
      role,
    };

    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// POST /login - User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validationError = validateLogin(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
};

module.exports = { register, login };

require("dotenv").config();
const express = require("express");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ message: "Virtual Event Management API is running!" });
});

// Routes - matching the required API endpoints
app.use("/", authRoutes); // POST /register, POST /login
app.use("/", eventRoutes); // GET/POST/PUT/DELETE /events, POST /events/:id/register

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

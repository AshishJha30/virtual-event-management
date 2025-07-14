const jwt = require("jsonwebtoken");
const { users } = require("../../data");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );

    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "Access denied. User not found.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Access denied. Invalid token.",
    });
  }
}

module.exports = { authenticate };

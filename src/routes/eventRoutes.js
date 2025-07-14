const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/eventController");

// Simple auth middleware for quick fix
const simpleAuth = (req, res, next) => {
  req.user = { id: "temp-user", role: "organizer", email: "test@example.com" };
  next();
};

// GET /events - Get all events
router.get("/events", simpleAuth, getEvents);

// POST /events - Create event (Organizers only)
router.post("/events", simpleAuth, createEvent);

// PUT /events/:id - Update event (Organizers only)
router.put("/events/:id", simpleAuth, updateEvent);

// DELETE /events/:id - Delete event (Organizers only)
router.delete("/events/:id", simpleAuth, deleteEvent);

// POST /events/:id/register - Register for event
router.post("/events/:id/register", simpleAuth, registerForEvent);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/eventController");
const { authenticate } = require("../middleware/authenticate");

// GET /events - Get all events
router.get("/events", authenticate, getEvents);

// POST /events - Create event (Organizers only)
router.post("/events", authenticate, createEvent);

// PUT /events/:id - Update event (Organizers only)
router.put("/events/:id", authenticate, updateEvent);

// DELETE /events/:id - Delete event (Organizers only)
router.delete("/events/:id", authenticate, deleteEvent);

// POST /events/:id/register - Register for event
router.post("/events/:id/register", authenticate, registerForEvent);

module.exports = router;

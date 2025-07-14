const { sendEmail } = require("../utils/sendEmail");
const { users, events } = require("../../data");
const { validateEventData } = require("../utils/validation");

// Helper function to check if user is organizer
const isOrganizer = (userId) => {
  const user = users.find((u) => u.id === userId);
  return user && user.role === "organizer";
};

// GET /events - Get all events
const getEvents = (req, res) => {
  try {
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving events",
      error: error.message,
    });
  }
};

// POST /events - Create a new event (Organizers only)
const createEvent = (req, res) => {
  try {
    // Check if user is organizer
    if (!isOrganizer(req.user.id)) {
      return res.status(403).json({
        message: "Only organizers can create events",
      });
    }

    const { title, description, date, time } = req.body;

    // Validate input data
    const validationError = validateEventData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Create new event
    const newEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      description,
      date,
      time,
      createdBy: req.user.id,
      participants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    events.push(newEvent);

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
};

// PUT /events/:id - Update event (Organizers only)
const updateEvent = (req, res) => {
  try {
    const event = events.find((e) => e.id === req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is the organizer
    if (event.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Only the event organizer can update this event",
      });
    }

    // Validate update data
    const validationError = validateEventData(req.body, true);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Update event
    const { title, description, date, time } = req.body;
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    event.updatedAt = new Date().toISOString();

    res.json({
      message: "Event updated successfully",
      event: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
      error: error.message,
    });
  }
};

// DELETE /events/:id - Delete event (Organizers only)
const deleteEvent = (req, res) => {
  try {
    const eventIndex = events.findIndex((e) => e.id === req.params.id);

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = events[eventIndex];

    // Check if user is the organizer
    if (event.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Only the event organizer can delete this event",
      });
    }

    // Remove the event
    events.splice(eventIndex, 1);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
      error: error.message,
    });
  }
};

// POST /events/:id/register - Register for event
const registerForEvent = async (req, res) => {
  try {
    const event = events.find((e) => e.id === req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user.id;
    const user = users.find((u) => u.id === userId);

    // Check if user is already registered
    if (event.participants.includes(userId)) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }

    // Organizer cannot register for their own event
    if (event.createdBy === userId) {
      return res.status(400).json({
        message: "Event organizer cannot register as a participant",
      });
    }

    // Add participant
    event.participants.push(userId);

    // Send confirmation email
    try {
      await sendEmail(user.email, event);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError.message);
      // Continue with registration even if email fails
    }

    res.json({
      message: "Successfully registered for the event",
      event: {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering for event",
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
};

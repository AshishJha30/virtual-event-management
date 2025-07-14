// Validation utilities

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRegistration = (data) => {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    return "Name, email, and password are required";
  }

  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  if (role && !["attendee", "organizer"].includes(role)) {
    return "Role must be either 'attendee' or 'organizer'";
  }

  return null;
};

const validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return "Email and password are required";
  }

  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  return null;
};

const validateEventData = (data, isUpdate = false) => {
  const { title, description, date, time } = data;

  if (!isUpdate) {
    if (!title || !description || !date || !time) {
      return "Title, description, date, and time are required";
    }
  }

  // Validate date format if provided
  if (data.date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.date)) {
      return "Date must be in YYYY-MM-DD format";
    }
  }

  // Validate time format if provided
  if (data.time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.time)) {
      return "Time must be in HH:MM format";
    }
  }

  // Validate that the event is not in the past
  if (data.date && data.time) {
    const eventDateTime = new Date(`${data.date}T${data.time}`);
    if (eventDateTime < new Date()) {
      return "Event date and time cannot be in the past";
    }
  }

  return null;
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateEventData,
  validateEmail,
};

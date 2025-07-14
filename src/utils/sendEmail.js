const nodemailer = require("nodemailer");

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail", // You can change this to your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
};

// Send email function
const sendEmail = async (userEmail, eventDetails) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Event Registration Confirmation",
      html: `
        <h2>Registration Confirmed!</h2>
        <p>Dear User,</p>
        <p>You have successfully registered for the following event:</p>
        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0;">
          <h3>${eventDetails.title}</h3>
          <p><strong>Description:</strong> ${eventDetails.description}</p>
          <p><strong>Date:</strong> ${eventDetails.date}</p>
          <p><strong>Time:</strong> ${eventDetails.time}</p>
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br>Event Management Team</p>
      `,
    };

    // For development/testing, we'll simulate email sending
    if (process.env.NODE_ENV === "development" || !process.env.EMAIL_USER) {
      console.log("📧 Email Simulation (Development Mode)");
      console.log("To:", userEmail);
      console.log("Subject:", mailOptions.subject);
      console.log("Event:", eventDetails.title);
      console.log("Date:", eventDetails.date, "at", eventDetails.time);

      return Promise.resolve({
        success: true,
        message: "Email simulated in development mode",
      });
    }

    // Send actual email in production
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully to:", userEmail);
    return {
      success: true,
      messageId: result.messageId,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);

    // In development, we'll still simulate success to not break the flow
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email simulation fallback");
      return {
        success: true,
        message: "Email simulated (fallback)",
      };
    }

    throw error;
  }
};

module.exports = { sendEmail };

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware to handle form submissions (URL-encoded + JSON)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Transporter (use Gmail App Password!)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "djk14530@gmail.com",  // your Gmail
        pass: "rbpt muhm qmfq gwzp", // your Gmail App Password
      },
    });

    let mailOptions = {
      from: email,
      to: "djk14530@gmail.com", // the email that will receive messages
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send a response page (user sees this after submit)
    res.send(`
      <h2 style="font-family: Arial; color: green;">✅ Thank you, ${name}! Your message has been sent successfully.</h2>
      <a href="/">⬅ Go back to homepage</a>
    `);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`
      <h2 style="font-family: Arial; color: red;">❌ Failed to send message. Please try again later.</h2>
      <a href="/">⬅ Go back to homepage</a>
    `);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

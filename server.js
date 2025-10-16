const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/contact", async (req, res) => {
  console.log("Contact form data:", req.body);
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send(`
      <div style="font-family: Arial; text-align: center; padding: 50px; background: #ff6b6b; color: white;">
        <h2>❌ Missing Information</h2>
        <p>Please fill in all fields.</p>
        <a href="/" style="background: white; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px;">⬅ Go back</a>
      </div>
    `);
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "djk14530@gmail.com",
        pass: process.env.EMAIL_PASS || "rbpt muhm qmfq gwzp",
      },
    });
    
    console.log("Sending email with user:", process.env.EMAIL_USER || "djk14530@gmail.com");

    // Email to you (notification)
    let mailOptions = {
      from: process.env.EMAIL_USER || "djk14530@gmail.com",
      to: "djk14530@gmail.com", 
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-left: 4px solid #007bff;">
          ${message}
        </div>
        <hr>
        <p><em>Reply to: ${email}</em></p>
      `,
    };

    console.log("Sending email to djk14530@gmail.com");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    res.send(`
      <div style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh;">
        <h2>✅ Thank you, ${name}!</h2>
        <p>Your message has been sent successfully. I'll get back to you soon!</p>
        <a href="/" style="background: white; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">⬅ Go back to homepage</a>
      </div>
    `);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`
      <div style="font-family: Arial; text-align: center; padding: 50px; background: #ff6b6b; color: white; min-height: 100vh;">
        <h2>❌ Failed to send message</h2>
        <p>Error: ${error.message}</p>
        <p>Please try again or contact me directly at djk14530@gmail.com</p>
        <a href="/" style="background: white; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">⬅ Go back</a>
      </div>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email user: ${process.env.EMAIL_USER || 'djk14530@gmail.com'}`);
  console.log(`📧 Email pass: ${process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]'}`);
});

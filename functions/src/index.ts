// functions/src/index.ts
import * as functions from "firebase-functions";
import nodemailer from "nodemailer";

// Read credentials from Firebase Functions config (gmail.*)
const emailUser = process.env.EMAIL_FROM;
const emailPass = process.env.PASS;
const emailTo = process.env.EMAIL_TO;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendContactForm = functions.https.onRequest(async (req, res) => {
  // Set CORS headers for all requests
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !email || !phone || !message) {
    res.status(400).send({ error: "Missing required fields." });
    return;
  }

  const mailOptions = {
    from: emailUser || "",
    replyTo: email,
    to: emailTo || "",
    subject: `Contact form: ${subject || "No subject"}`,
    text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject || "N/A"}
Message:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
    return;
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).send({ error: "Failed to send email." });
    return;
  }
});

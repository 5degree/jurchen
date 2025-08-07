import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import cors from 'cors';

const corsHandler = cors({ origin: true });

// Configure the email transport (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'niteshgupta288@gmail.com',
    pass: 'xwlm afsl kdbz iadh', // use App Passwords (not your real Gmail password)
  },
});

export const sendContactForm = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: 'your-email@gmail.com',
      subject: 'New Submission on Contact Form',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).send({ success: true });
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).send({ error: 'Failed to send email.' });
    }
  });
});
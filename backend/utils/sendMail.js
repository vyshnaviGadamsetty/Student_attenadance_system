// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const sendMail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: to,
//     subject: subject,
//     text: text
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${to}`);
//   } catch (error) {
//     console.error("❌ Email failed:", error);
//   }
// };
// // 🔁 Only for testing
// if (process.env.NODE_ENV !== 'production') {
//     sendMail(
//       "nandinidevi_nandyala@srmap.edu.in",  // 👈 your test email
//       "Test Mail from Attendance System",
//       "This is a test email to verify Nodemailer setup!"
//     );
//   }
// export default sendMail;
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

export default sendMail;

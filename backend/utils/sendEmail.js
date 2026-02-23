const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {

 const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,

     },

     tls:{
        rejectUnauthorized:false,
     }
   });

  await transporter.sendMail({

    from: `"CakeSquare 🍰" <${process.env.EMAIL_USER}>`,

    to,

    subject,

    html,

  });

};

module.exports = sendEmail;
 

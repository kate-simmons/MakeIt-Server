import nodemailer from "nodemailer";

export async function SendEmail(email, bill) {
  console.log(email, bill);
  try {
    // nodemailer transporter (for the credentials and authorization)
    // using Brevo for SMTP (visit its documentation for more details)
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      // service: "Gmail",
      port: 587,
      // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Brevo email
        pass: process.env.EMAIL_PASS, // Your Brevo password
      },
    });

    // HTML and CSS content for the email
    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
      }
      .logo {
        width: 100px;
      }
      .content {
        text-align: center;
        padding: 20px 0;
      }
      .thank-you {
        font-size: 24px;
        font-weight: bold;
        color: #3498db;
      }
      .message {
        font-size: 16px;
        color: #333;
      }
      .button {
        display: inline-block;
        background-color: #3498db;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .button:hover {
        background-color: #2780b9;
      }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
         
        </div>
        <div class="content">
          <p class="thank-you">Thank you for choosing Make-It!</p>
          <p class="message">
            <br>
              Date : ${bill.date}
            <br>
           Your total bill is : ${bill.total} rs.
          </p>
          <a class="button" href="https://makeit.com/">Click Here To Visit your Make-It Account</a>
        </div>
      </div>
    </body>
    </html>
    `;

    // sending email and providing data (what to send, whom to send, etc)
    let info = await transporter.sendMail({
      from: "janager8860000281@gmail.com", // Sender address
      to: email, // Recipient's email
      subject: "Thank you for ordering with Make-It", // Subject line
      text: emailContent, // Plain text body
    });

    console.log("email sent");
    return { status: true, data: "email send" };
  } catch (error) {
    console.log(error.message);
    return { status: false, data: error.message };
  }
}

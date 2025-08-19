import nodemailer from "nodemailer";

export const sendVerificationCode = async (email, name, verificationCode) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", port: 587, secure: false,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    let info = await transporter.sendMail({
      from: `"Advanced Authentication ✍🏻 " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Verify your account - Advanced Auth",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f6f8; }
            .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .header h1 { color: #3B1E54; margin: 0; }
            .content { text-align: center; margin: 20px 0; }
            .code-box { background: #3B1E54; color: #fff; font-size: 24px; letter-spacing: 6px; font-weight: bold; padding: 12px 24px; border-radius: 8px; display: inline-block; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>Advanced Authentication</h1></div>
            <div class="content">
              <p>Hello 👋, ${name}<br>Use the verification code below to complete your signup:</p>
              <div class="code-box">${verificationCode}</div>
              <p>This code will expire in <b>10 minutes</b>. Please do not share it with anyone.</p>
            </div>
            <div class="footer"><p>© 2025 Advanced Auth. All rights reserved.</p></div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("📩 Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
};

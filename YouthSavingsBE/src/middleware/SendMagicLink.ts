import nodemailer from "nodemailer";

// content
const html = (token: String) => {
  return `
  <html>
    <head>
      <style>
       background-color: #f1f1f1;
        }
        .card {
          padding: 20px;
          .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
           border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: white;
          width: 400px;
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .content {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="title">YouthSavings</div>
          <div class="content">
            You are receiving this email because you have
            requested the reset of the password for your account.
          </div>
          <a href="http://localhost:3000/reset-password/${token}" class="button"
            >LOGIN</a
          >
        </div>
      </div>
    </body>
  </html>
    `;
};

const SendMagicLink = async (email: String, token: String) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "ducnam883@gmail.com",
      pass: "xfqh pimi zsjj tsew",
    },
  });

  const info = await transporter.sendMail({
    from: '"YouthSavings" <noreply@YouthSavings.io>',
    to: `${email}`,
    subject: " Dang nhap nhanh me len",
    html: html(token),
  });
};

export default SendMagicLink;

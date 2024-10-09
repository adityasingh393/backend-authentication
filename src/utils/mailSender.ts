import nodemailer from "nodemailer";
import * as dotenv from "dotenv"
dotenv.config()
const mailSender = async (email: string, title: string, body: string) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.OTP_SENDER_MAIL}`,
        pass: `${process.env.OTP_SENDER_PASSWORD}`,
      },
    });

    let info = await mailTransporter.sendMail({
      from: `${process.env.SENDER_USER_NAME}`,
      to: email,
      subject: title,
      html: body,
      text: "Node.js testing mail for GeeksforGeeks",
    });
    console.log("email info from line 19 mailsender.ts", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export default mailSender;

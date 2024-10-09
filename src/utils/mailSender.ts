import nodemailer from "nodemailer";
const mailSender = async (email: string, title: string, body: string) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aditya.singh@binmile.com",
        pass: "vpte swmj ujxz crpq",
      },
    });

    let info = await mailTransporter.sendMail({
      from: "aditya.singh@binmile.com",
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

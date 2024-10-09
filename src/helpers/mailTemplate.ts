// let mailTransporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "aditya.singh@binmile.com",
//     pass: "vpte swmj ujxz crpq",
//   },
// });

// let mailDetails = {
//   from: "aditya.singh@binmile.com",
//   to: "aadityasinghh2010@gmail.com",
//   subject: "Test mail",
//   text: "Node.js testing mail for GeeksforGeeks",
// };

// mailTransporter.sendMail(mailDetails, function (err: Error, data: any) {
//   if (err) {
//     console.log("Error Occurs");
//   } else {
//     console.log("Email sent successfully");
//   }
// });

import mailSender from "../utils/mailSender";

async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email, //email of the user to whom we need to send the mail
      "Verification Email", //title or subject
      `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
    );
    console.log(
      "Email sent successfully (from line 43 miILTEMPLtw.ts): ",
      mailResponse
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

export default sendVerificationEmail;

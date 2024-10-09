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

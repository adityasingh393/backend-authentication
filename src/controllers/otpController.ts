import otpGenerator from "otp-generator";
import { OtpModel } from "../models/otp";
import express from "express";
import { getUserByEmail } from "../models/users";
import sendVerificationEmail from "../helpers/mailTemplate";
export const sentOtp = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await getUserByEmail(email);

    if (checkUserPresent) {
      res.status(401).json({ message: "user already exists", success: false });
      return;
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OtpModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OtpModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OtpModel.create(otpPayload);
    sendVerificationEmail(email, otp);
    res.status(200).json({
      success: true,
      message: "otp sent successful",
      otp,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

export const otpVerification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, otp } = req.body;
    if (!otp) {
      res.status(400).json({ message: "no otp sent" });
      return;
    }
    const response = await OtpModel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "verification successful",
    });
  } catch (error) {
    console.log(error.message);
  }
};

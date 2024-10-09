import otpGenerator from "otp-generator";
import { OtpModel } from "../models/otp";
import express from "express";
import { getUserByEmail } from "../models/users";
import sendVerificationEmail from "../helpers/mailTemplate";
export const sentOtp = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await getUserByEmail(email);

    if (checkUserPresent) {
      return res
        .status(401)
        .json({ message: "user already exists", success: false });
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
  } catch (error) {
    console.log(error);
  }
};

// export default sentOtp;
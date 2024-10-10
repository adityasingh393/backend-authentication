import express from "express";
import { login, register } from "../controllers/authentication";
import { otpVerification, sentOtp } from "../controllers/otpController";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/otp-generate", sentOtp);
  router.post('/auth/verify-otp',otpVerification)
};

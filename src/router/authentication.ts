import express from "express";
import { login, register } from "../controllers/authentication";
import { sentOtp } from "../controllers/otpController";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/otp-generate", sentOtp);

  // router.post("/auth/userInfo", getUserInfoByEmail);
  // router.get("/auth/allUsers", getAllUsers);
  // router.post("/auth/getUserInfoById",getUserInfoById);
  // router.put("/auth/updateUserById", updateUserInfoById);
};

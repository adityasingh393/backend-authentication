import express from "express";

import {
  getAllUsers,
  getUserInfoByEmail,
  getUserInfoById,
  login,
  register,
  updateUserInfoById,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/userInfo", getUserInfoByEmail);
  router.get("/auth/allUsers", getAllUsers);  // 
  router.post("/auth/getUserInfoById",getUserInfoById);
  router.put("/auth/updateUserById", updateUserInfoById);
};

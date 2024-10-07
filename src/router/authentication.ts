import express from "express";

import {
  getAllUsers,
  getUserInfoByEmail,
  login,
  register,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/userInfo", getUserInfoByEmail);
  router.get("/auth/allUsers", getAllUsers);
};

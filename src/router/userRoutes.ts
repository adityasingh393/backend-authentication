import { isAuthenticated } from "../middelwares";
import {
  getAllUsers,
  getAllUsersInfo,
  getUserInfoByEmail,
  getUserInfoById,
  getUserInfoBySessionId,
  updateUserInfoById,
} from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.post("/user/userInfo", getUserInfoByEmail);
  router.get("/user/allUsers", isAuthenticated, getAllUsers);
  router.post("/user/getUserInfoById", getUserInfoById);
  router.get("/user/getUserInfoBySessionId", getUserInfoBySessionId);
  router.put("/user/updateUserById", updateUserInfoById);
  router.get("/user/userCreatedAt",getAllUsersInfo)
};

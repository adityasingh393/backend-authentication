import {
  getAllUsers,
  getUserInfoByEmail,
  getUserInfoById,
  updateUserInfoById,
} from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.post("/user/userInfo", getUserInfoByEmail);
  router.get("/user/allUsers", getAllUsers);
  router.post("/user/getUserInfoById", getUserInfoById);
  router.put("/user/updateUserById", updateUserInfoById);
};

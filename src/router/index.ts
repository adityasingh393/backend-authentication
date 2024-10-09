import express from "express";
import authentication from "./authentication";
import userRoutes from "./userRoutes";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  userRoutes(router);
  return router;
};

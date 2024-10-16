import express from "express";
import authentication from "./authentication";
import userRoutes from "./userRoutes";
import faqRouter from "./faqRouter";
import policyRouter from "./policyRouter";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  userRoutes(router);
  faqRouter(router);
  policyRouter(router);
  return router;
};

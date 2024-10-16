import { isAuthenticated } from "../middelwares";
import express from "express";
import {
  createPolicy,
  getAllPolicies,
  getPolicy,
  updatePolicy,
} from "../controllers/policyController";
export default (router: express.Router) => {
  router.post("/admin/policy/create", isAuthenticated, createPolicy);
  router.put("/admin/policy/update-policy", isAuthenticated, updatePolicy);
  router.get("/admin/policy/allPolicies", getAllPolicies);
  router.post("/admin/policy/getPolicy", getPolicy);
};

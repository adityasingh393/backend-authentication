import { isAuthenticated } from "../middelwares";
import { faqCreate, findfaq, getAllFaqs, updateFaq } from "../controllers/faqController";
import express from "express";

export default (router: express.Router) => {
  router.post("/admin/createFaq", isAuthenticated, faqCreate);
  router.get("/admin/allfaqs", isAuthenticated, getAllFaqs);
  router.put("/admin/update-faq", isAuthenticated, updateFaq);
  router.post("/admin/faq", isAuthenticated, findfaq);
};

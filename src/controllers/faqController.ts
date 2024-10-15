import epxress from "express";
import {
  createFaq,
  getAll,
  getFaqById,
  updateFaqById,
} from "../models/faqModel";
import { update } from "lodash";

export const faqCreate = async (
  req: epxress.Request,
  res: epxress.Response
) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400).json({
        message: "either no question or no answer",
      });
      return;
    }
    const faq = await createFaq({
      question,
      answer,
    });
    res.status(200).json(faq).end();
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFaq = async (
  req: epxress.Request,
  res: epxress.Response
) => {
  try {
    const id = req.body._id;
    const updateData = req.body;
    if (!id) {
      res.status(400).json({
        message: "no id found",
      });
      return;
    }
    const updatedFaq = await updateFaqById(id, updateData);
    if (!updatedFaq) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(updatedFaq).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unknow error has occured" });
  }
};

export const getAllFaqs = async (
  req: epxress.Request,
  res: epxress.Response
) => {
  try {
    const faqs = await getAll();
    if (!faqs) {
      res.status(404).json({ message: "no faq found" });
      return;
    }
    res.status(200).json(faqs).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unknown error has occured" });
  }
};

export const findfaq = async (req: epxress.Request, res: epxress.Response) => {
  try {
    const id = req.body._id;
    console.log(id);
    if (!id) {
      res.status(400).json({ message: "no id found" });
      return;
    }
    const faq = await getFaqById(id);
    console.log(faq)
    if (!faq) {
      res.status(404).json({ message: "no faq found" });
      return;
    }
    res.status(200).json(faq).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "an unknown error has occured" });
  }
};

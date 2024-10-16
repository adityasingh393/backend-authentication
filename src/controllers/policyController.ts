import express from "express";
import { update } from "lodash";
import { updateFaqById } from "../models/faqModel";
import {
  createPolicies,
  getAllPolicy,
  getPolicyById,
  updatePolicyById,
} from "../models/policyModels";

export const createPolicy = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
      res.status(400).json({ message: "not title or category" });
      return;
    }
    const policy = await createPolicies({
      title,
      category,
      content,
    });
    res.status(200).json(policy).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unknow error has occured" });
  }
};

export const updatePolicy = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body._id;  
    console.log(id);
    const updateData = req.body;
    if (!id) {
      res.status(400).json({ message: "no id found" });
      return;
    }
    const updatedPolicy = await updatePolicyById(id, updateData);
    console.log(updatedPolicy);
    if (!updatePolicy) {
      res.status(400).json({ message: "no policy found" });
      return;
    }
    res.status(200).json({ updatedPolicy }).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unknow error has occured" });
  }
};

export const getAllPolicies = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allPolicies = await getAllPolicy();
    if (!allPolicies) {
      res.status(404).json({ message: "no policy found" });
      return;
    }
    res.status(200).json({ allPolicies }).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "unkown error has occured" });
  }
};

export const getPolicy = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.status(400).json({ message: "no id found" });
      return;
    }
    const policy = await getPolicyById(id);
    if (!policy) {
      res.status(404).json({ message: "no policy found" });
      return;
    }
    res.status(200).json(policy);
  } catch (error) {
    console.log(error.message);
  }
};

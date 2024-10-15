import { values } from "lodash";
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);
export const FaqModel = mongoose.model("faq", faqSchema);

//db operations
export const createFaq = (values: Record<string, any>) =>
  new FaqModel(values).save().then((faq) => faq.toObject());
export const getAll = () => FaqModel.find();
export const getFaqById = (id: string) => FaqModel.findById(id);

export const updateFaqById = (id: string, values: Record<string, any>) => 
  FaqModel.findByIdAndUpdate(id, values);


import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    //   user:{type:mongoose.Schema.Types.ObjectId, ref:"Users", required:true}
  },
  {
    timestamps: true,
  }
);
export const PolicyModel = mongoose.model("policy", policySchema);


//db operations
export const getAllPolicy = () => PolicyModel.find();

export const updatePolicyById = (id: string, values: Record<string, any>) => 
  PolicyModel.findByIdAndUpdate(id, values);
export const createPolicies=(values:Record<string,any>)=>new PolicyModel(values).save().then((policy)=>policy.toObject());

export const getPolicyById = (id: string) => PolicyModel.findById(id);

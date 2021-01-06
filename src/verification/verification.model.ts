import * as mongoose from "mongoose";
import { verification } from "./verification.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const verificationSchema = new mongoose.Schema({
  verificationId: {
    type: String,
    index: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
  },
  deficiency: {
    type: String,
  },
  findings: {
    type: String,
  },
  products: {
    type: Array,
  },
  researchCenter: {
    type: String
  },
  image: {
    type: String
  },
  stage: {
    type: String
  },
  nValue: {
    type: String
  },
  pValue: {
    type: String
  },
  kValue: {
    type: String
  },
  checked: {
    type: Boolean
  },
  verificationNote: {
    type: String
  }
});

verificationSchema.index({
  verificationId: "text",
});

verificationSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });

const verificationModel = mongoose.model<verification & mongoose.Document>("Verification", verificationSchema);

export default verificationModel;

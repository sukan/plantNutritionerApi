import * as mongoose from "mongoose";
import { research } from "./research.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const researchSchema = new mongoose.Schema({
  researchId: {
    type: String,
    index: true,
    unique: true,
  },
  deficiency: {
    type: String,
    require: true,
  },
  findings: {
    type: String,
  },
  products: {
    type: Array,
  },
  researchCenter: {
    type: String
  }
});

researchSchema.index({
  researchId: "text",
});

researchSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });

const researchModel = mongoose.model<research & mongoose.Document>("Research", researchSchema);

export default researchModel;

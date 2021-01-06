import * as mongoose from "mongoose";
import { Deficiency } from "./deficiency.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const deficiencySchema = new mongoose.Schema({
  deficiency: {
    type: String,
    index: true,
    unique: true,
  },
  researchCenter: {
    type: String,
    require: true,
  },
});

deficiencySchema.index({
  deficiency: "text",
});

deficiencySchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });

const deficiencyModel = mongoose.model<Deficiency & mongoose.Document>("Deficiency", deficiencySchema);

export default deficiencyModel;

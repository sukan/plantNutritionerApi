import * as mongoose from "mongoose";
import { product } from "./products.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    index: true,
    unique: true,
  },
  productName: {
    type: String,
    require: true,
  },
  vendor: {
    type: String,
  },
  unitPrice: {
    type: Number
  },
  applicationMethod: {
    type: String
  },
  deficiency: {
    type: String
  },
  researchCenter: {
    type: String
  }
});

productSchema.index({
  productCode: "text",
});

productSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });

const productModel = mongoose.model<product & mongoose.Document>("Product", productSchema);

export default productModel;

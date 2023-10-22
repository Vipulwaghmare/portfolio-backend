import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
  },
  images: {
    type: [String],
    required: [true, "Please provide images"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User not found"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

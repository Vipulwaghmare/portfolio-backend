"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const productSchema = new mongoose_1.default.Schema({
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
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User not found"],
    },
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=Product.model.js.map
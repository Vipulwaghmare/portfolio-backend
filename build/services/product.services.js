"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_1 = __importDefault(require("../models/Product.model"));
const productServices = {
    getProductById: (id) => Product_model_1.default.findById(id),
    createProduct: (productData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO: add type
        const product = Object.assign(Object.assign({}, productData), { createdBy: userId });
        return Product_model_1.default.create(product);
    }),
    deleteProduct: (id) => Product_model_1.default.deleteOne({ _id: id }),
};
exports.default = productServices;
//# sourceMappingURL=product.services.js.map
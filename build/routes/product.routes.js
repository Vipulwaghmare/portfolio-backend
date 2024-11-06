"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const productRouter = (0, express_1.Router)();
productRouter
    .route("/product/:id")
    .get((0, catchAsyncErrors_1.default)(product_controller_1.default.getProductById));
productRouter
    .route("/products")
    .get((0, catchAsyncErrors_1.default)(product_controller_1.default.getProducts));
productRouter
    .route("/product")
    .post(verifyUser_1.default, (0, catchAsyncErrors_1.default)(product_controller_1.default.addProduct));
productRouter
    .route("/product")
    .put(verifyUser_1.default, (0, catchAsyncErrors_1.default)(product_controller_1.default.updateProduct));
productRouter
    .route("/product/:id")
    .delete(verifyUser_1.default, (0, catchAsyncErrors_1.default)(product_controller_1.default.deleteProduct));
exports.default = productRouter;
//# sourceMappingURL=product.routes.js.map
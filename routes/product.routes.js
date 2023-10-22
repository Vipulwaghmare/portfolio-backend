import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import productControllers from "../controller/product.controller.js";

const productRouter = Router();

productRouter
  .route("/product/:id")
  .get(catchAsyncErrors(productControllers.getProductById));
productRouter
  .route("/products")
  .get(catchAsyncErrors(productControllers.getProducts));

export default productRouter;

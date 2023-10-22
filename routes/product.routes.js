import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import productControllers from "../controller/product.controller.js";
import verifyUser from "../middlewares/verifyUser.js";

const productRouter = Router();

productRouter
  .route("/product/search")
  .get(catchAsyncErrors(productControllers.searchProduct));
productRouter
  .route("/product/:id")
  .get(catchAsyncErrors(productControllers.getProductById));
productRouter
  .route("/products")
  .get(catchAsyncErrors(productControllers.getProducts));
productRouter
  .route("/product")
  .post(verifyUser, catchAsyncErrors(productControllers.addProduct));
productRouter
  .route("/product")
  .put(verifyUser, catchAsyncErrors(productControllers.updateProduct));
productRouter
  .route("/product/:id")
  .delete(verifyUser, catchAsyncErrors(productControllers.deleteProduct));

export default productRouter;

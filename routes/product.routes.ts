import { Router } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import productControllers from "../controller/product.controller";
import verifyUser from "../middlewares/verifyUser";

const productRouter = Router();

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

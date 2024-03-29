import APIError from "../middlewares/ErrorHandler.js";
import productServices from "../services/product.services.js";
import { TRequest } from "./types.js";

const MAX_LIMIT = 100;

type ProductControllers = {
  getProductById: TRequest;
  getProducts: TRequest;
  addProduct: TRequest;
  updateProduct: TRequest;
  deleteProduct: TRequest;
};

const productControllers: ProductControllers = {
  getProductById: async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
      throw new APIError({
        message: "Product Id is not provided",
        status: 400,
      });
    }
    const product = await productServices.getProductById(productId);
    if (!product) {
      return res.send({
        product: null,
        message: "Product not found",
      });
    }
    return res.send({ product });
  },
  getProducts: async (req, res) => {
    let { limit = "10", pageNumber = "1" } = req.query;
    limit = parseInt(limit) > MAX_LIMIT ? MAX_LIMIT : parseInt(limit);
    pageNumber = parseInt(pageNumber);

    return res.send({
      limit,
      pageNumber,
    });
  },
  addProduct: async (req, res) => {
    const productData = req.body;
    const product = await productServices.createProduct(
      productData,
      req.body.userId,
    );
    return res.send(product);
  },
  updateProduct: async (req, res) => {
    return res.send({ message: 'WIP' })
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    const product = await productServices.deleteProduct(productId);
    if (product.deletedCount === 1) {
      return res.send({ message: "Product deleted successfully" });
    }
    return res.send({ message: "Product not found" });
  },
}

export default productControllers;

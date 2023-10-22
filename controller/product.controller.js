import APIError from "../middlewares/ErrorHandler.js";

const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    throw new APIError({
      message: "Product Id is not provided",
      status: 400,
    });
  }
  return res.send({ productId });
};

const getProductsController = async (req, res) => {
  const productQuery = req.query;
  return res.send({ productQuery });
};

const productControllers = {
  getProductById: getProductByIdController,
  getProducts: getProductsController,
};

export default productControllers;

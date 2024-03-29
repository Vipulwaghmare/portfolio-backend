import Product from "../models/Product.model";

const productServices = {
  getProductById: (id) => Product.findById(id),
  createProduct: async (productData, userId) => {
    const product = {
      ...productData,
      createdBy: userId,
    };
    return Product.create(product);
  },
  deleteProduct: (id) => Product.deleteOne({ _id: id }),
};

export default productServices;

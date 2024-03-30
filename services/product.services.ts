import Product from '../models/Product.model';

const productServices = {
  getProductById: (id: string) => Product.findById(id),
  createProduct: async (productData: any, userId: string) => {
    // TODO: add type
    const product = {
      ...productData,
      createdBy: userId,
    };
    return Product.create(product);
  },
  deleteProduct: (id: string) => Product.deleteOne({ _id: id }),
};

export default productServices;

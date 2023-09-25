import { omit } from 'lodash';
import productModel, { Product } from '../models/product.model';
import { encrypt } from '../utils/aesEncryption';

// Find All product
export const findAllProducts = async () => {
  return await productModel.find();
};

// Find Product by Id
export const findProductByUserId = async (id: string) => {
  return await productModel.find({ user: id });
};

// Create Product service
export const createProduct = async (input: Product) => {
  console.log('input >>> ', input)

  const product = await productModel.create(input);
  return omit(product.toJSON());
};

// Update Product By Id
export const updateProuduct = async (id: string, input: Partial<Product>) => {
  const product = await productModel.findByIdAndUpdate({ _id:  id }, input);

  return omit(product?.toJSON());
}

// Delete Product By Id
export const deleteProduct = async (id: string) => {
  return await productModel.findByIdAndDelete({ _id:  id }).exec();
}

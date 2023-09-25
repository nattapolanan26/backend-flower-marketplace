import { Request, Response, NextFunction } from "express";
import { createProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAllProducts, findProductByUserId, updateProuduct } from "../services/product.service";
import { encrypt, decrypt} from '../utils/aesEncryption'
const fs = require('fs');

export const getProductMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const product = await findProductByUserId(userId);

    res.status(200).json({
      status: 'success',
      data: {
        product
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await findAllProducts();
  // await products.forEach(item => item.file = decrypt(item.file));
    res.status(200).json({
      status: 'success',
      result: products.length,
      data: {
        products,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createProductHandler = async (
  req: Request<{}, {}, createProductInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('file >>>>>> ', req.file)

    const product = await createProduct({
      product_name: req.body.product_name,
      product_type: req.body.product_type,
      price: req.body.price,
      mobile: req.body.mobile,
      description: req.body.description,
      file: req.file?.filename as string,
      user: req.body.user
    });

    res.status(201).json({
      status: 'success',
      product
    });
  } catch (err: any) {
    console.log(err)
    next(err);
  }
};

export const updateProductHandler = async (
  req: Request<{}, {}, createProductInput & { _id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('request body >>>>>>> ', req.body);

    await updateProuduct(req.body._id, {
      product_name: req.body.product_name,
      product_type: req.body.product_type,
      price: req.body.price,
      mobile: req.body.mobile,
      description: req.body.description,
      file: req.file?.filename,
      user: req.body.user
    });

    console.log('update success');

    res.status(201).json({
      status: true,
      message: 'success'
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    // code
    const id = req.params.id;
    const removed = await deleteProduct(id);

    if(removed?.file){
      await fs.unlink('./upload/' + removed.file, (err: Error) => {
        if(err){
          console.log(err);
        }else {
          console.log('remove success!');
        }
      })

    }
    res.status(201).json({ status: true, message: 'success'})
  } catch(err: any) {
    next(err);
  }
}

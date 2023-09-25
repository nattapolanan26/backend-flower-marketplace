import { any, object, record, string, TypeOf } from 'zod';

export const createProductSchema = object({
  body: object({
    product_name: string({ required_error: 'Product name is required' }),
    price: string({ required_error: 'Price is required' }),
    product_type: string({ required_error: 'Product type is required' }),
    mobile: string({ required_error: 'Mobile is required' })
      .max(10, 'Mobile must be less than 10 characters'),
    description: string(),
    file: string({ required_error: 'File is required' }),
    user: string({ required_error: 'User createdAt is required' })
  })
});

export type createProductInput = TypeOf<typeof createProductSchema>['body'];

import {
  getModelForClass,
  prop,
} from "@typegoose/typegoose";

class FileUpload {
  @prop()
  public model?: string;
}

export class Product {
  @prop({ required: true })
  product_name: string;

  @prop({ required: true })
  product_type: string;

  @prop({ required: true })
  price: string;

  @prop({ required: true, maxlength: 10 })
  mobile: string;

  @prop({ required: false })
  description: string;

  @prop({ required: true })
  file: string;

  @prop({ type: String, required: true })
  user: String;
}

const productModel = getModelForClass(Product);

export default productModel;

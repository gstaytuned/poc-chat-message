import { randomUUID } from "crypto";
import { Document } from "dynamoose/dist/Document";
import dynamoose from "./ddb";
import { Product, ProductModel } from "./product.model";
export class Order extends Document {
  pk: string; // register by user onboarding?
  sk: string;
  qty: number;
  total_price: string;
  name: string;
  product_id: string;
  GSI1PK: string;
  GSI2PK: string;
}

const schema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
  },
  sk: {
    type: String,
    rangeKey: true,
  },
  GSI1PK: {
    type: String,
    index: {
      global: true,
      rangeKey: "sk",
      name: "GSI1",
      project: true, // ProjectionType: ALL
      throughput: 1, // read and write are both 5
    },
  },
  product_id: {
    type: String,
  },
  qty: {
    type: Number,
  },
  name: {
    type: String,
  },
  total_price: {
    type: Number,
  },
  GSI2PK: {
    type: String,
    index: {
      global: true,
      rangeKey: "sk",
      name: "GSI2",
      project: true, // ProjectionType: ALL
      throughput: 1, // read and write are both 5
    },
  },
});

export const OrderModel = dynamoose.model<Order>(
  `${process.env.TABLE_NAME_SHOPPING}`,
  schema,
  {
    create: true,
  }
);

export const createOrder = async (product:Product, userId: string) => {
  dynamoose.transaction([
    OrderModel.transaction.create({
      pk: `ORDER#${randomUUID()}`,
      sk: `CFORDER#${product.cf_code}`,
      qty: 1,
      total_price: product.price * 1,
      product_id: product.product_id,
      name: product.name,
      GSI1PK: product.pk,
      GSI2PK: `USER#${userId}`,
    }),
    ProductModel.transaction.update(
      {
        pk: product.pk,
        sk: product.sk,
      },
      { $ADD: { stock: -1 } }
    ),
  ]);
};

export const getOrderByUser = async(userId: string) =>{
  const orders = await OrderModel.query("GSI2PK").eq(`USER#${userId}`).where("sk").beginsWith("CFORDER").exec();
  return orders;
}
export const getOrderByChannel = async(channelId: string) =>{
  const orders = await OrderModel.query("GSI1PK").eq(`CHANNEL#${channelId}`).where("sk").beginsWith("CFORDER").exec();
  return orders;
}
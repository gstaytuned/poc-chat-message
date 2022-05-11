import { Document } from "dynamoose/dist/Document";
import dynamoose from "./ddb";

export class Product extends Document {
  pk: string; // register by user onboarding?
  sk: string;
  cf_code: string;
  product_id: string;
  store_id: string;
  user_id: string;
  stock: number;
  name: string;
  price: number;
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
  // GSI1PK: {
  //   type: String,
  //   index: {
  //     global: true,
  //     rangeKey: 'GSI1SK',
  //     name: 'GSI1',
  //     project: true, // ProjectionType: ALL
  //     throughput: 2 // read and write are both 5
  // }
  // },
  // GSI1SK: {
  //   type: String,
  // },
  stock: {
    type: Number,
  },
  product_id: {
    type: String,
  },
  store_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  cf_code: {
    type: String,
  },
  // type: {
  //   type: String,
  // }
});

export const ProductModel = dynamoose.model<Product>(
  `${process.env.TABLE_NAME_SHOPPING}`,
  schema,
  {
    create: true,
  }
);

export const validateProductExisting = async (channelId: string, cfCode: string): Promise<Product> => {
  const [product] = await ProductModel.query("pk")
    .eq(`CHANNEL#${channelId}`)
    .where("sk")
    .eq(`CF#${cfCode}`)
    .exec();
  return product;
};

export const init = async () => {
  await ProductModel.batchPut([
    {
      pk: "CHANNEL#1",
      sk: "CF#CF10",
      cf_code: "CF10",
      store_id: "A SHOP",
      user_id: "user_1",
      product_id: "1",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#1",
      sk: "CF#CF11",
      cf_code: "CF11",
      store_id: "B SHOP",
      user_id: "user_1",
      product_id: "2",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#1",
      sk: "CF#CF12",
      cf_code: "CF12",
      store_id: "C SHOP",
      product_id: "3",
      user_id: "user_1",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF20",
      cf_code: "CF20",
      store_id: "D SHOP",
      user_id: "user_2",
      product_id: "4",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF21",
      cf_code: "CF21",
      store_id: "E SHOP",
      user_id: "user_2",
      product_id: "5",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF22",
      cf_code: "CF22",
      store_id: "F SHOP",
      user_id: "user_2",
      product_id: "6",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#0882675235",
      sk: "CF#N100",
      cf_code: "N100",
      store_id: "G SHOP",
      user_id: "user_3",
      product_id: "6",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#0882675235",
      sk: "CF#N101",
      cf_code: "N101",
      product_id: "6",
      user_id: "user_3",
      store_id: "H SHOP",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#0882675235",
      sk: "CF#N102",
      cf_code: "N102",
      store_id: "I SHOP",
      user_id: "user_3",
      product_id: "6",
      stock: 10,
      name: "Boots",
      price: 100,
    },
  ]);
};

export const getProductByChannel  = async(channelId: string)  => {
  const products = await ProductModel.query("pk").eq(`CHANNEL#${channelId}`).where("sk").beginsWith("CF").exec();
  return products;
}
import { Document } from "dynamoose/dist/Document";
import dynamoose from "./ddb";

export class Product extends Document {
  pk: string; // register by user onboarding?
  sk: string;
  cf_code: string;
  product_id: string;
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
  // channel_id: {
  //   type: String,
  // },
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

export const validateProductExisting = async (body): Promise<any> => {
  const [product] = await ProductModel.query("pk")
    .eq(`CHANNEL#${body.channel_id}`)
    .where("sk")
    .eq(`CF#${body.cf_code}`)
    .exec();
  return product;
};

export const init = async () => {
  await ProductModel.batchPut([
    {
      pk: "CHANNEL#1",
      sk: "CF#CF10",
      cf_code: "CF10",
      product_id: "1",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#1",
      sk: "CF#CF11",
      cf_code: "CF11",
      product_id: "2",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#1",
      sk: "CF#CF12",
      cf_code: "CF12",
      product_id: "3",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF20",
      cf_code: "CF20",
      product_id: "4",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF21",
      cf_code: "CF21",
      product_id: "5",
      stock: 10,
      name: "Boots",
      price: 100,
    },
    {
      pk: "CHANNEL#2",
      sk: "CF#CF22",
      cf_code: "CF22",
      product_id: "6",
      stock: 10,
      name: "Boots",
      price: 100,
    },
  ]);
};

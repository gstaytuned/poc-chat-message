import { init, ProductModel } from "db";
import type { Context } from "koa";
import { BaseRoutedController, Route } from "kolp";

export class ProductController extends BaseRoutedController {
  @Route({
    method: "post",
    path: "/",
    middlewares: [],
  })
  async init(_context: Context) {
    try {
      // crate mock data
      await init();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  @Route({
    method: "get",
    path: "/:channel",
    middlewares: [],
  })
  async getProductByChannel(context: Context) {
    const channel = context.params.channel
    const products = await ProductModel.query("pk").eq(`CHANNEL#${channel}`).where("sk").beginsWith("CF").exec()
    return {
      products: products,
    };
  }
}

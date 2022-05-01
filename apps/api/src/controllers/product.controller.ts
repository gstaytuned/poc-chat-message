import { init, ProductModel, getProductByChannel } from "db";
import { request } from "https";
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
    const products = await getProductByChannel(channel)
    return {
      products: products,
    };
  }
}

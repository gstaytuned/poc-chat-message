import { init, OrderModel, ProductModel } from "db";
import type { Context } from "koa";
import { BaseRoutedController, Route } from "kolp";

export class OderController extends BaseRoutedController {
  @Route({
    method: "get",
    path: "/:channel",
    middlewares: [],
  })
  async getOrderByChannel(context: Context) {
    const channel = context.params.channel
    const orders = await OrderModel.query("GSI1PK").eq(`CHANNEL#${channel}`).where("sk").beginsWith("CFORDER").exec()
    return {
      orders: orders,
    };
  }

}

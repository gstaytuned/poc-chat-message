import { getOrderByChannel, getOrderByUser } from "db/src/models/order.model";
import type { Context } from "koa";
import { BaseRoutedController, Route } from "kolp";

export class OderController extends BaseRoutedController {
  @Route({
    method: "get",
    path: "/:userId/purchased",
    middlewares: [],
  })
  async getOrderByUser(context: Context) {
    const userId = context.params.userId;
    const orders = await getOrderByUser(userId);
    return {
      orders: orders,
    };
  }
  @Route({
    method: "get",
    path: "/:channel",
    middlewares: [],
  })
  async getOrderByChannel(context: Context) {
    const channel = context.params.channel;
    const orders = await getOrderByChannel(channel);
    return {
      orders: orders,
    };
  }
}

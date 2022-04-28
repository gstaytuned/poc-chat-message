import {
  createOrder, validateProductExisting
} from "db";
import type { Context } from "koa";
import { BaseRoutedController, Route } from "kolp";

export class ReceiverController extends BaseRoutedController {
  @Route({
    method: "post",
    path: "/",
    middlewares: [
      //withFilter()
    ],
  })
  async createOrder(context: Context) {
    const body = context.request.body;
    const product = await validateProductExisting(body);
    await createOrder(product);
    return body;
  }
}

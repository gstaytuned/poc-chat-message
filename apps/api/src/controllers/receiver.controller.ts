import {withRequest } from "@middlewares/withRequest";
import { randomUUID } from "crypto";
import { createOrder, validateProductExisting } from "db";
import type { Context } from "koa";
import { BaseRoutedController, Route } from "kolp";
import { AmityService } from "src/adapters/request/amity.service";
import { Events } from "src/enums/events";
import Event from "../models/event";

export class ReceiverController extends BaseRoutedController {
  @Route({
    method: "post",
    path: "/",
    middlewares: [
      withRequest()
    ],
  })
  async createOrder(context: Context) {
    const body: Event = context.request.body;
    const event = body.event;
    let channelId = "";
    let cfCode = "";
    let userId = "";
    if (event === Events.DID_CREATED) {
      channelId = body.data.messages[0].channelId;
      cfCode = body.data.messages[0].data.text.toUpperCase();
      userId = body.data.users[0].userId;
      const product = await validateProductExisting(channelId, cfCode);
      if (!product) {
        throw new Error("channel ID and CF code not match");
      }
      await createOrder(product, userId);
      await sendOrderConfirmation(product, userId);
    }
    return;
  }
}

const sendOrderConfirmation = async (product, userId) => {
  const conversationRoom = await AmityService.getInstance().createConversation({
    userIds: [userId],
    isDistinct: true,
    displayName: "TrueID Live commerce",
    metadata: {},
    tags: [],
  });
  await AmityService.getInstance().createMessage({
    channelId: conversationRoom.channels[0].channelId,
    messageId: randomUUID(),
    type: "text",
    data: {
      text: `[${product.cf_code}] คุณได้ทำการสั่งซื้อ ${product.name} จำนวน 1 ตัว กด link google.com เพื่อทำการชำระเงิน `,
    },
    metadata: {},
    tags: [],
    mentionees: [],
  });
};
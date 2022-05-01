import { makeServerWithRouter, withJson } from "kolp";

import { OderController } from "@controllers/order.controller";
import { withRequest } from "@middlewares/withRequest";

export default makeServerWithRouter((router) => {
  router.prefix("/order").use(withJson()).use(withRequest());

  // Register your controllers here.
  new OderController().register("", router);
});

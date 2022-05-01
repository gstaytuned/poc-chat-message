import { makeServerWithRouter, withJson } from "kolp";

import { ReceiverController } from "@controllers/receiver.controller";
import { withRequest } from "@middlewares/withRequest";

export default makeServerWithRouter((router) => {
  router.prefix("/receiver").use(withJson()).use(withRequest());
  // Json error handler!

  // Register your controllers here.
  new ReceiverController().register("", router);
});

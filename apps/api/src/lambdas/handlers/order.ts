import { makeServerWithRouter, withJson } from 'kolp'

import { OderController } from '@controllers/order.controller'

export default makeServerWithRouter((router) => {
  router.prefix('/order')
    .use(withJson())
    // Json error handler!
  
  // Register your controllers here.
  new OderController().register('', router)
})

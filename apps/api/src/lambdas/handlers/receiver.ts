import { makeServerWithRouter, withJson } from 'kolp'

import { ReceiverController } from '@controllers/receiver.controller'

export default makeServerWithRouter((router) => {
  router.prefix('/receiver')
    .use(withJson())
    // Json error handler!
  
  // Register your controllers here.
  new ReceiverController().register('', router)
})

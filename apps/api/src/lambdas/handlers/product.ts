import { makeServerWithRouter, withJson } from 'kolp'

import { ProductController } from '@controllers/product.controller'

export default makeServerWithRouter((router) => {
  router.prefix('/product')
    .use(withJson())
    // Json error handler!
  
  // Register your controllers here.
  new ProductController().register('', router)
})

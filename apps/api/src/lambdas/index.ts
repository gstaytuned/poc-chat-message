import { handlerPath, ServerlessFnDef } from "@libs/handler-resolver"

const def = new ServerlessFnDef(`${handlerPath(__dirname)}/handlers`)
  .fn('receiver')
  .fn('product')
  .fn('order')
  .functions()

export default def
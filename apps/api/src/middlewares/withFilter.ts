// exr= (text: string) => new RegExp('abc').test(text);

export const withFilter = () => async(ctx, next) => { 
  const rqBody = ctx.request.body;
  const isConfirmPattern = new RegExp('abc').test(rqBody.cf_code);
  if(isConfirmPattern){
    await next()
  }else{
    ctx.body = {
      success: false,
      error: "not cf code",
  };
  }
}
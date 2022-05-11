// exr= (text: string) => new RegExp('abc').test(text);

export const withRequest = () => async (ctx, next) => {
  const rqBody = ctx.request.body;
  if (rqBody) {
    console.log(`Inbound request : ${JSON.stringify(rqBody)}`);
  }
  await next();
  const rsBody = ctx.response.body;
  console.log(`Inbound response : ${JSON.stringify(rsBody)}`);
};

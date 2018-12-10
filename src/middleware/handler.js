const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    // ctx.response.type = 'html';
    ctx.response.body = {
        result:true,
        message:err.message
    }
    ctx.app.emit('error', err, ctx);
  }
};

module.exports=handler;

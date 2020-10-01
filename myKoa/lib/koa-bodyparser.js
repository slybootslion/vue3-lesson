function body(ctx) {
  return new Promise((resolve, reject) => {
    const arr = []
    ctx.req.on('data', function (chunk) {
      arr.push(chunk)
    })
    ctx.req.on('end', function () {
      resolve(Buffer.concat(arr))
    })
  })
}


module.exports = function bodyParser() {
  return async (ctx, next) => {
    ctx.request.body = await body(ctx)
    await next()
  }
}

let koa = require("koa");
let router = require("koa-router")();
let serve = require("koa-static");
let fs = require("fs");
let path = require("path");

const cors = require("koa-cors");
const { fstat } = require("fs");

let app = new koa();

app.use(serve(__dirname + "/lib"));
app.use(async (ctx, next) => {
  await next();
});
app.use(cors());

router.post("/upload", async (ctx) => {
  console.log(ctx.req);
  const stream = ctx.req;
  const filename = ctx.query.name;
  let dir = path.join(__dirname, "source-map");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let target = path.join(dir, filename);
  const ws = fs.createWriteStream(target);
  stream.pipe(ws);
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen("3000", () => {
  console.log("koa work");
});
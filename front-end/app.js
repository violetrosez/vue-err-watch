let koa = require("koa");
let router = require("koa-router")();
let serve = require("koa-static");
let fs = require("fs");
let path = require("path");
const cors = require("koa-cors");
const log4js = require("./logger/log4js");
const sourceMap = require("source-map");

let db = require("./db");

let app = new koa();

app.use(serve(__dirname + "/lib"));
app.use(async (ctx, next) => {
  await next();
});
app.use(cors());

router.post("/upload", async (ctx) => {
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

router.get("/error", async (ctx) => {
  const errInfo = ctx.query.info;
  // console.log(Buffer.from(errInfo, "base64").toString("utf-8"));
  let obj = JSON.parse(Buffer.from(errInfo, "base64").toString("utf-8"));

  let fileUrl = obj.filename.split("/").pop() + ".map"; // map文件路径
  // 解析sourceMap
  let consumer = await new sourceMap.SourceMapConsumer(
    fs.readFileSync(path.join(__dirname, "source-map/" + fileUrl), "utf8")
  ); // 返回一个promise对象
  // 解析原始报错数据
  let result = consumer.originalPositionFor({
    line: obj.lineno, // 压缩后的行号
    column: obj.colno, // 压缩后的列号
  });
  obj.lineno = result.line;
  obj.colno = result.column;
  log4js.logError(JSON.stringify(obj));
  await db.insert(obj);
  ctx.body = "";
});

router.get("/errlist", async (ctx) => {
  let res = await db.find({});
  ctx.body = {
    data: res,
  };
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen("3000", () => {
  console.log("koa work");
});

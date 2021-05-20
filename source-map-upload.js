const fs = require("fs");
const http = require("http");
const path = require("path");
class SourceMapUploader {
  constructor(options) {
    this.options = options;
  }
  /**
   * 用到了hooks，done这个时刻表示在打包完成之后
   */
  apply(compiler) {
    if (process.env.NODE_ENV == "production") {
      compiler.hooks.done.tap("sourcemap-uploader", async (status) => {
        // console.log(status.compilation.outputOptions.path);
        // 读取目录下的map后缀的文件
        let dir = path.join(status.compilation.outputOptions.path, "/js/");
        let chunks = fs.readdirSync(dir);
        let map_file = chunks.filter((item) => {
          return item.match(/\.js\.map$/) !== null;
        });
        // 上传sourcemap
        while (map_file.length > 0) {
          let file = map_file.shift();
          await this.upload(this.options.url, path.join(dir, file));
        }
      });
    }
  }

  upload(url, file) {
    return new Promise((resolve) => {
      let req = http.request(`${url}?name=${path.basename(file)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Connection: "keep-alive",
        },
      });

      let fileStream = fs.createReadStream(file);
      fileStream.pipe(req, { end: false });
      fileStream.on("end", function() {
        // 写入尾部
        req.end();
        resolve();
      });
    });
  }
}
module.exports = SourceMapUploader;

// const path = require("path");
const resolve = (dir) => require("path").join(__dirname, dir);
let SourceMapUploader = require("./source-map-upload");
module.exports = {
  lintOnSave: false,
  // publicPath: '/',
  publicPath: "",
  outputDir: "dist",
  productionSourceMap: true,

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
      new SourceMapUploader({
        url: "http://localhost:3000/upload",
      }),
    ],
  },
  //   chainWebpack: (config) => {},
};

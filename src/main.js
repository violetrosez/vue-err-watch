import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
let app = createApp(App);
app.use(ElementPlus);

window.addEventListener(
  "error",
  (e) => {
    console.log(e);
    uploadErr(e);
    return true;
  },
  true
);
// 处理未捕获的异常，主要是promise内部异常，统一抛给 onerror
window.addEventListener("unhandledrejection", (e) => {
  throw e.reason;
});
// 框架异常统一捕获
// app.config.errorHandler = function(err, vm, info) {
//   console.log(err.stack);
// };
// 错误上报
function uploadErr({ lineno, colno, error: { stack }, message, filename }) {
  let str = window.btoa(
    JSON.stringify({
      lineno,
      colno,
      stack,
      message,
      filename,
    })
  );
  let front_ip = "http://localhost:3000/error";
  new Image().src = `${front_ip}?info=${str}`;
}
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";


window.addEventListener(
  "error",
  (e) => {
    uploadErr(e);
    return true;
  },
  true
);
// 处理未捕获的异常，主要是promise内部异常，统一抛给 onerror
window.addEventListener("unhandledrejection", (e) => {
  throw e.reason;
});

let app = createApp(App);
app.use(ElementPlus);
// 框架异常统一捕获
app.config.errorHandler = function(err) {
  console.error(err);
};



// 错误上报
function uploadErr({ lineno, colno, error: { stack }, message, filename }) {

  let userAgent = navigator.userAgent; //浏览器信息
  let date = new Date().toLocaleDateString();
  let str = window.btoa(
    JSON.stringify({
      lineno,
      colno,
      stack,
      message,
      filename,
      userAgent,
      date
    })
  );
  let front_ip = "http://localhost:3000/error";
  new Image().src = `${front_ip}?info=${str}`;
}
app.mount("#app");

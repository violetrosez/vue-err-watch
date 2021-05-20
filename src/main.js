import { createApp } from "vue";
import App from "./App.vue";

let app = createApp(App);

window.addEventListener(
  "error",
  (e) => {
    console.log(e);
    return true;
  },
  true
);
// 处理未捕获的异常，主要是promise内部异常，统一抛给 onerror
window.addEventListener("unhandledrejection", (e) => {
  throw e.reason;
});
// 框架异常统一捕获
app.config.errorHandler = function(err, vm, info) {
  console.log(err, vm, info);
};
app.mount("#app");

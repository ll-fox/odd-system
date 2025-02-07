"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
}
const _sfc_main = {
  onLaunch() {
    common_vendor.er.init({
      provider: "aliyun",
      // 根据你的云服务商选择
      spaceId: "your-space-id",
      clientSecret: "your-client-secret"
    });
    this.checkLogin();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:13", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:16", "App Hide");
  },
  methods: {
    checkLogin() {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map

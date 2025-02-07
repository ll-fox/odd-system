"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    async handleLogin() {
      try {
        common_vendor.index.__f__("log", "at pages/login/login.vue:12", "开始获取用户信息");
        const res = await common_vendor.index.getUserProfile({
          desc: "获取用户信息"
        });
        if (!res || !res.userInfo) {
          throw new Error("获取用户信息失败");
        }
        common_vendor.index.__f__("log", "at pages/login/login.vue:21", "用户信息:", res.userInfo);
        common_vendor.index.__f__("log", "at pages/login/login.vue:23", "开始获取code");
        const codeRes = await common_vendor.index.login();
        if (codeRes.errMsg !== "login:ok") {
          throw new Error("获取code失败");
        }
        common_vendor.index.__f__("log", "at pages/login/login.vue:28", "获取到的code:", codeRes.code);
        common_vendor.index.__f__("log", "at pages/login/login.vue:30", "调用云函数登录");
        const loginRes = await common_vendor.er.callFunction({
          name: "wechat-login",
          data: {
            code: codeRes.code,
            userInfo: res.userInfo
          }
        });
        common_vendor.index.__f__("log", "at pages/login/login.vue:38", "云函数返回:", loginRes);
        if (loginRes.result.code !== 0) {
          throw new Error(loginRes.result.msg || "登录失败");
        }
        common_vendor.index.setStorageSync("token", loginRes.result.token);
        common_vendor.index.setStorageSync("userInfo", res.userInfo);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:58", "登录失败:", error);
        common_vendor.index.showToast({
          title: error.message || "登录失败，请重试",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map

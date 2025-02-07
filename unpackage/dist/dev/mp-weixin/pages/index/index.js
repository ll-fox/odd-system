"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        trackingNumber: "",
        courier: "",
        remark: ""
      },
      courierCompanies: ["顺丰速运", "圆通快递", "中通快递", "韵达快递", "京东物流", "邮政快递"],
      userInfo: null
    };
  },
  onLoad() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const token = common_vendor.index.getStorageSync("token");
      if (token) {
        this.userInfo = common_vendor.index.getStorageSync("userInfo");
        return;
      }
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    onCourierChange(e) {
      this.form.courier = this.courierCompanies[e.detail.value];
    },
    onSubmit() {
      if (!this.form.trackingNumber) {
        common_vendor.index.showToast({
          title: "请填写快递单号",
          icon: "none"
        });
        return;
      }
      if (!this.form.courier) {
        common_vendor.index.showToast({
          title: "请选择快递公司",
          icon: "none"
        });
        return;
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:70", "表单数据:", this.form);
      common_vendor.index.showToast({
        title: "提交成功"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.trackingNumber,
    b: common_vendor.o(($event) => $data.form.trackingNumber = $event.detail.value),
    c: common_vendor.t($data.form.courier || "请选择快递公司"),
    d: $data.courierCompanies,
    e: common_vendor.o((...args) => $options.onCourierChange && $options.onCourierChange(...args)),
    f: $data.form.remark,
    g: common_vendor.o(($event) => $data.form.remark = $event.detail.value),
    h: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map

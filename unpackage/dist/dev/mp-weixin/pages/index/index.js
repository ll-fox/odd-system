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
      courierCompanies: ["顺丰", "中通", "圆通", "申通", "韵达"]
    };
  },
  methods: {
    onCourierChange(e) {
      this.form.courier = this.courierCompanies[e.detail.value];
    },
    onSubmit() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:41", "提交的表单数据:", this.form);
      common_vendor.index.showToast({
        title: "提交成功",
        icon: "success"
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

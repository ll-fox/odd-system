"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      form: {
        trackingNumber: "",
        courier: "",
        remark: ""
      },
      courierCompanies: ["顺丰速运", "圆通快递", "中通快递", "韵达快递", "京东物流", "邮政快递"],
      loading: false
    };
  },
  onLoad() {
  },
  methods: {
    onCourierChange(e) {
      this.form.courier = this.courierCompanies[e.detail.value];
    },
    onTrackingNumberInput(event) {
      const value = event.detail.value;
      const filteredValue = value.replace(/[^\u0000-\u007F]/g, "");
      this.$nextTick(() => {
        this.form.trackingNumber = filteredValue;
      });
    },
    async onSubmit() {
      if (this.loading)
        return;
      this.loading = true;
      if (!this.form.trackingNumber.trim()) {
        common_vendor.index.showToast({
          title: "请填写快递单号",
          icon: "none"
        });
        this.loading = false;
        return;
      }
      if (!this.form.courier) {
        common_vendor.index.showToast({
          title: "请选择快递公司",
          icon: "none"
        });
        this.loading = false;
        return;
      }
      try {
        const formData = {
          ...this.form,
          status: "待处理"
        };
        const res = await common_vendor.er.callFunction({
          name: "feedback",
          data: formData
        });
        if (res.result.code === 200) {
          common_vendor.index.showToast({
            title: "提交成功"
          });
          this.form = {
            trackingNumber: "",
            courier: "",
            remark: ""
          };
        } else if (res.result.code === 400) {
          common_vendor.index.showToast({
            title: res.result.message || "提交失败",
            icon: "none"
          });
        } else {
          common_vendor.index.showToast({
            title: res.result.message || "提交失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "网络错误，请重试",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.o([($event) => $data.form.trackingNumber = $event.detail.value, (...args) => $options.onTrackingNumberInput && $options.onTrackingNumberInput(...args)]),
    c: $data.form.trackingNumber,
    d: common_vendor.t($data.form.courier || "请选择快递公司"),
    e: $data.courierCompanies,
    f: common_vendor.o((...args) => $options.onCourierChange && $options.onCourierChange(...args)),
    g: $data.form.remark,
    h: common_vendor.o(($event) => $data.form.remark = $event.detail.value),
    i: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args)),
    j: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map

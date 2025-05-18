"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑快递信息"
    },
    trackingData: {
      type: Object,
      default: () => ({
        trackingNumber: "",
        courier: "",
        remark: ""
      })
    }
  },
  data() {
    return {
      courierData: {
        trackingNumber: "",
        courier: "",
        remark: ""
      },
      courierCompanies: ["顺丰速运", "圆通快递", "中通快递", "韵达快递", "京东物流", "邮政快递"]
    };
  },
  watch: {
    trackingData: {
      handler(newVal) {
        this.courierData = { ...newVal };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onCourierChange(e) {
      this.courierData.courier = this.courierCompanies[e.detail.value];
    },
    onCancel() {
      this.$emit("close");
    },
    onConfirm() {
      this.$emit("confirm", this.courierData);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.visible
  }, $props.visible ? {
    b: common_vendor.t($props.title),
    c: $data.courierData.trackingNumber,
    d: common_vendor.t($data.courierData.courier || "请选择快递公司"),
    e: $data.courierCompanies,
    f: common_vendor.o((...args) => $options.onCourierChange && $options.onCourierChange(...args)),
    g: $data.courierData.remark,
    h: common_vendor.o(($event) => $data.courierData.remark = $event.detail.value),
    i: common_vendor.o((...args) => $options.onCancel && $options.onCancel(...args)),
    j: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/EditCourierDialog.js.map

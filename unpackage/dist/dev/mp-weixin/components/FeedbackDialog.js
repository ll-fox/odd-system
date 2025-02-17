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
      default: "反馈"
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    onCancel() {
      this.$emit("close");
    },
    onConfirm() {
      this.$emit("confirm", this.inputValue);
      this.inputValue = "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.visible
  }, $props.visible ? {
    b: common_vendor.t($props.title),
    c: $data.inputValue,
    d: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    e: common_vendor.o((...args) => $options.onCancel && $options.onCancel(...args)),
    f: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/FeedbackDialog.js.map

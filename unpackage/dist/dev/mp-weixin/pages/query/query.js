"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      trackingNumber: "",
      result: null,
      loading: false
    };
  },
  methods: {
    async onQuery() {
      if (this.loading)
        return;
      this.loading = true;
      this.result = null;
      if (!this.trackingNumber) {
        common_vendor.index.showToast({
          title: "请填写快递单号",
          icon: "none"
        });
        this.loading = false;
        return;
      }
      try {
        const res = await common_vendor.er.callFunction({
          name: "query-tracking",
          data: {
            trackingNumber: this.trackingNumber
          }
        });
        if (res.result.code === 200) {
          this.result = res.result.data;
        } else if (res.result.code === 404) {
          common_vendor.index.showToast({
            title: res.result.message || "未找到相关记录",
            icon: "none"
          });
        } else {
          common_vendor.index.showToast({
            title: res.result.message || "查询失败",
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
    },
    // 根据状态返回对应的样式类
    getStatusClass(status) {
      switch (status) {
        case "待处理":
          return "status-pending";
        case "处理中":
          return "status-processing";
        case "已处理":
          return "status-completed";
        default:
          return "";
      }
    },
    // 格式化时间
    formatTime(time) {
      if (!time)
        return "";
      const date = new Date(time);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.trackingNumber,
    b: common_vendor.o(($event) => $data.trackingNumber = $event.detail.value),
    c: common_vendor.o((...args) => $options.onQuery && $options.onQuery(...args)),
    d: $data.result
  }, $data.result ? common_vendor.e({
    e: common_vendor.t($data.result.trackingNumber),
    f: common_vendor.t($data.result.courier),
    g: common_vendor.t($data.result.remark),
    h: common_vendor.t($data.result.status),
    i: common_vendor.n($options.getStatusClass($data.result.status)),
    j: $data.result.status === "已处理" && $data.result.feedback
  }, $data.result.status === "已处理" && $data.result.feedback ? {
    k: common_vendor.t($data.result.feedback)
  } : {}, {
    l: common_vendor.t($options.formatTime($data.result.createdAt))
  }) : {}, {
    m: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/query/query.js.map

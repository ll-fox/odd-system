"use strict";
const common_vendor = require("../../common/vendor.js");
const FeedbackDialog = () => "../../components/FeedbackDialog.js";
const _sfc_main = {
  components: {
    FeedbackDialog
  },
  data() {
    return {
      trackingNumber: "",
      result: null,
      loading: false,
      feedbackText: "",
      showFeedbackDialog: false
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
    },
    openFeedbackDialog() {
      this.showFeedbackDialog = true;
    },
    async submitSecondaryFeedback(content) {
      if (!content.trim()) {
        common_vendor.index.showToast({ title: "反馈内容不能为空", icon: "none" });
        return;
      }
      try {
        const res = await common_vendor.er.callFunction({
          name: "update-feedback",
          data: {
            trackingNumber: this.result.trackingNumber,
            secondaryFeedback: content,
            feedbackTime: Date.now()
          }
        });
        if (res.result.code === 200) {
          common_vendor.index.showToast({ title: "反馈提交成功" });
          this.showFeedbackDialog = false;
          this.onQuery();
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "提交失败，请重试", icon: "none" });
      }
    }
  }
};
if (!Array) {
  const _component_FeedbackDialog = common_vendor.resolveComponent("FeedbackDialog");
  _component_FeedbackDialog();
}
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
    k: common_vendor.t($data.result.feedback),
    l: common_vendor.o((...args) => $options.openFeedbackDialog && $options.openFeedbackDialog(...args))
  } : {}, {
    m: $data.result.secondaryFeedback
  }, $data.result.secondaryFeedback ? {
    n: common_vendor.t($data.result.secondaryFeedback)
  } : {}, {
    o: $data.result.feedbackTime
  }, $data.result.feedbackTime ? {
    p: common_vendor.t($options.formatTime($data.result.feedbackTime))
  } : {}, {
    q: common_vendor.t($options.formatTime($data.result.createdAt))
  }) : {}, {
    r: $data.loading
  }, $data.loading ? {} : {}, {
    s: common_vendor.o(($event) => $data.showFeedbackDialog = false),
    t: common_vendor.o($options.submitSecondaryFeedback),
    v: common_vendor.p({
      visible: $data.showFeedbackDialog,
      title: "二次反馈"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/query/query.js.map

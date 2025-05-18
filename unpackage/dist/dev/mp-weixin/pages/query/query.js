"use strict";
const common_vendor = require("../../common/vendor.js");
const FeedbackDialog = () => "../../components/FeedbackDialog.js";
const EditCourierDialog = () => "../../components/EditCourierDialog.js";
const _sfc_main = {
  components: {
    FeedbackDialog,
    EditCourierDialog
  },
  data() {
    return {
      trackingNumber: "",
      result: null,
      loading: false,
      feedbackText: "",
      showFeedbackDialog: false,
      showEditDialog: false
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
    },
    openEditDialog() {
      this.showEditDialog = true;
    },
    async updateCourierInfo(courierData) {
      if (!courierData.courier.trim()) {
        common_vendor.index.showToast({ title: "快递公司不能为空", icon: "none" });
        return;
      }
      try {
        this.loading = true;
        const res = await common_vendor.er.callFunction({
          name: "update-courier-info",
          data: {
            trackingNumber: courierData.trackingNumber,
            courier: courierData.courier,
            remark: courierData.remark
          }
        });
        if (res.result.code === 200) {
          common_vendor.index.showToast({ title: "更新成功" });
          this.showEditDialog = false;
          this.onQuery();
        } else {
          common_vendor.index.showToast({ title: res.result.message || "更新失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "提交失败，请重试", icon: "none" });
      } finally {
        this.loading = false;
      }
    }
  }
};
if (!Array) {
  const _component_FeedbackDialog = common_vendor.resolveComponent("FeedbackDialog");
  const _component_EditCourierDialog = common_vendor.resolveComponent("EditCourierDialog");
  (_component_FeedbackDialog + _component_EditCourierDialog)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.trackingNumber,
    b: common_vendor.o(($event) => $data.trackingNumber = $event.detail.value),
    c: common_vendor.o((...args) => $options.onQuery && $options.onQuery(...args)),
    d: $data.result
  }, $data.result ? common_vendor.e({
    e: ["待处理", "处理中"].includes($data.result.status)
  }, ["待处理", "处理中"].includes($data.result.status) ? {
    f: common_vendor.o((...args) => $options.openEditDialog && $options.openEditDialog(...args))
  } : {}, {
    g: common_vendor.t($data.result.trackingNumber),
    h: common_vendor.t($data.result.courier),
    i: common_vendor.t($data.result.remark),
    j: common_vendor.t($data.result.status),
    k: common_vendor.n($options.getStatusClass($data.result.status)),
    l: $data.result.status === "已处理" && $data.result.feedback
  }, $data.result.status === "已处理" && $data.result.feedback ? {
    m: common_vendor.t($data.result.feedback),
    n: common_vendor.o((...args) => $options.openFeedbackDialog && $options.openFeedbackDialog(...args))
  } : {}, {
    o: $data.result.secondaryFeedback
  }, $data.result.secondaryFeedback ? {
    p: common_vendor.t($data.result.secondaryFeedback)
  } : {}, {
    q: $data.result.feedbackTime
  }, $data.result.feedbackTime ? {
    r: common_vendor.t($options.formatTime($data.result.feedbackTime))
  } : {}, {
    s: common_vendor.t($options.formatTime($data.result.createdAt))
  }) : {}, {
    t: $data.loading
  }, $data.loading ? {} : {}, {
    v: common_vendor.o(($event) => $data.showFeedbackDialog = false),
    w: common_vendor.o($options.submitSecondaryFeedback),
    x: common_vendor.p({
      visible: $data.showFeedbackDialog,
      title: "二次反馈"
    }),
    y: common_vendor.o(($event) => $data.showEditDialog = false),
    z: common_vendor.o($options.updateCourierInfo),
    A: common_vendor.p({
      visible: $data.showEditDialog,
      title: "编辑快递信息",
      trackingData: $data.result
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/query/query.js.map

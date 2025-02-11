<template>
  <view class="content">
    <view class="form-container">
      <view class="form-item">
        <text class="label">快递单号</text>
        <input class="input" v-model="trackingNumber" placeholder="请输入快递单号" />
      </view>
      <button class="submit-btn" @click="onQuery">
        <text>查询</text>
      </button>
    </view>

    <!-- 查询结果模块 -->
    <view class="result-container" v-if="result">
      <view class="result-card">
        <view class="result-section">
          <text class="section-title">快递信息</text>
          <view class="result-item">
            <text class="result-label">快递单号</text>
            <text class="result-value">{{ result.trackingNumber }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">快递公司</text>
            <text class="result-value">{{ result.courier }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">备注</text>
            <text class="result-value">{{ result.remark }}</text>
          </view>
        </view>

        <view class="result-section">
          <text class="section-title">处理状态</text>
          <view class="result-item">
            <text class="result-label">状态</text>
            <text class="result-value" :class="getStatusClass(result.status)">{{ result.status }}</text>
          </view>
          <view class="result-item" v-if="result.status === '已处理' && result.feedback">
            <text class="result-label">处理意见</text>
            <text class="result-value">{{ result.feedback }}</text>
          </view>
          <view class="result-item">
            <text class="result-label">创建时间</text>
            <text class="result-value">{{ formatTime(result.createdAt) }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="loading" class="global-loading">
      <view class="loading"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      trackingNumber: '',
      result: null,
      loading: false
    };
  },
  methods: {
    async onQuery() {
      if (this.loading) return;
      this.loading = true;
      this.result = null; // 清空之前的结果

      if (!this.trackingNumber) {
        uni.showToast({
          title: '请填写快递单号',
          icon: 'none',
        });
        this.loading = false;
        return;
      }

      try {
        const res = await uniCloud.callFunction({
          name: 'query-tracking',
          data: {
            trackingNumber: this.trackingNumber,
          },
        });

        if (res.result.code === 200) {
          this.result = res.result.data;
        } else if (res.result.code === 404) {
          uni.showToast({
            title: res.result.message || '未找到相关记录',
            icon: 'none',
          });
        } else {
          uni.showToast({
            title: res.result.message || '查询失败',
            icon: 'none',
          });
        }
      } catch (error) {
        uni.showToast({
          title: '网络错误，请重试',
          icon: 'none',
        });
      } finally {
        this.loading = false;
      }
    },
    // 根据状态返回对应的样式类
    getStatusClass(status) {
      switch (status) {
        case '待处理':
          return 'status-pending';
        case '处理中':
          return 'status-processing';
        case '已处理':
          return 'status-completed';
        default:
          return '';
      }
    },
    // 格式化时间
    formatTime(time) {
      if (!time) return '';
      const date = new Date(time);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style>
.content {
  padding: 20px;
  background: linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%);
}

.form-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 14px;
  color: #1c1c1e;
  margin-bottom: 8px;
  font-weight: 500;
}

.input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  color: #1c1c1e;
}

.submit-btn {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #c49b45;
  color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
}

.submit-btn:active {
  background-color: #c49b45;
  opacity: 0.9;
}

/* 查询结果模块样式 */
.result-container {
  margin-top: 20px;
}

.result-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-section {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.result-section:last-child {
  border-bottom: none;
}

.section-title {
  display: block;
  font-size: 13px;
  color: #8E8E93;
  margin-bottom: 12px;
  font-weight: 500;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.result-label {
  font-size: 15px;
  color: #1C1C1E;
  font-weight: 400;
}

.result-value {
  font-size: 15px;
  color: #1C1C1E;
  text-align: right;
  max-width: 60%;
}

/* 状态样式 */
.status-pending {
  color: #FF9500;
}

.status-processing {
  color: #007AFF;
}

.status-completed {
  color: #34C759;
}

.global-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.loading {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(196, 155, 69, 0.2);
  border-top: 4px solid #c49b45;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 
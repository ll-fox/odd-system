<template>
  <view class="dialog" v-if="visible">
    <view class="dialog-content">
      <text class="dialog-title">{{ title }}</text>
      <view class="form-item">
        <text class="label">快递单号</text>
        <input class="input disabled" :value="courierData.trackingNumber" disabled />
      </view>
      <view class="form-item">
        <text class="label">快递公司</text>
        <picker class="picker" mode="selector" :range="courierCompanies" @change="onCourierChange">
          <view class="picker-text">{{ courierData.courier || '请选择快递公司' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">备注</text>
        <textarea class="textarea" v-model="courierData.remark" placeholder="请输入备注信息"></textarea>
      </view>
      <view class="dialog-buttons">
        <button @click="onCancel">取消</button>
        <button @click="onConfirm">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '编辑快递信息'
    },
    trackingData: {
      type: Object,
      default: () => ({
        trackingNumber: '',
        courier: '',
        remark: ''
      })
    }
  },
  data() {
    return {
      courierData: {
        trackingNumber: '',
        courier: '',
        remark: ''
      },
      courierCompanies: ['顺丰速运', '圆通快递', '中通快递', '韵达快递', '京东物流', '邮政快递']
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
      this.$emit('close');
    },
    onConfirm() {
      this.$emit('confirm', this.courierData);
    }
  }
};
</script>

<style>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 85%;
  max-width: 340px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dialog-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  color: #1c1c1e;
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
}

.form-item {
  margin-bottom: 16px;
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  background: #f5f5f7;
  font-size: 14px;
  color: #1c1c1e;
}

.input.disabled {
  background: #e0e0e0;
  color: #8E8E93;
}

.picker {
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  background: #f5f5f7;
}

.picker-text {
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #1c1c1e;
}

.textarea {
  width: 100%;
  height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: #1c1c1e;
  background-color: #f5f5f7;
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.dialog-buttons button {
  margin: 0;
  height: 46px;
  width: 100px;
  line-height: 46px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
}

.dialog-buttons button:first-child {
  background-color: #f5f5f7;
  color: #1c1c1e;
}

.dialog-buttons button:last-child {
  background-color: #c49b45;
  color: white;
}

.dialog-buttons button:active {
  opacity: 0.8;
}
</style> 
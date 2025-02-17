<template>
  <view class="dialog" v-if="visible">
    <view class="dialog-content">
      <text class="dialog-title">{{ title }}</text>
      <textarea class="dialog-input" v-model="inputValue" placeholder="请输入您的反馈内容"></textarea>
      <view class="dialog-buttons">
        <button @click="onCancel">取消</button>
        <button @click="onConfirm">提交</button>
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
      default: '反馈'
    }
  },
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {
    onCancel() {
      this.$emit('close');
    },
    onConfirm() {
      this.$emit('confirm', this.inputValue);
      this.inputValue = ''; // 清空输入
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
  width: 80%;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dialog-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  color: #1c1c1e;
  margin-bottom: 16px;
  text-align: center;
}

.dialog-input {
  width: 100%;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: #1c1c1e;
  background-color: #f5f5f7;
  margin-bottom: 16px;
}

.dialog-input:focus {
  border-color: #c49b45;
  outline: none;
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
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
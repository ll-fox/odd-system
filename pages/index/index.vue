<template>
	<view class="content">
		<view class="form-container">
			<view class="form-item">
				<text class="label">快递单号</text>
				<input class="input" v-model="form.trackingNumber" placeholder="请输入快递单号" />
			</view>
			<view class="form-item">
				<text class="label">快递公司</text>
				<picker class="picker" mode="selector" :range="courierCompanies" @change="onCourierChange">
					<view class="picker-text">{{ form.courier || '请选择快递公司' }}</view>
				</picker>
			</view>
			<view class="form-item">
				<text class="label">备注</text>
				<textarea class="textarea" v-model="form.remark" placeholder="请输入备注" />
			</view>
			<button class="submit-btn" @click="onSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					trackingNumber: '',
					courier: '',
					remark: ''
				},
				courierCompanies: ['顺丰速运', '圆通快递', '中通快递', '韵达快递', '京东物流', '邮政快递'],
				userInfo: null
			}
		},
		onLoad() {
			this.checkLogin()
		},
		methods: {
			async checkLogin() {
				const token = uni.getStorageSync('token')
				if (token) {
					this.userInfo = uni.getStorageSync('userInfo')
					return
				}
				// 未登录则跳转到登录页面
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			onCourierChange(e) {
				this.form.courier = this.courierCompanies[e.detail.value]
			},
			onSubmit() {
				if (!this.form.trackingNumber) {
					uni.showToast({
						title: '请填写快递单号',
						icon: 'none'
					})
					return
				}
				if (!this.form.courier) {
					uni.showToast({
						title: '请选择快递公司',
						icon: 'none'
					})
					return
				}
				// 这里可以添加提交逻辑
				console.log('表单数据:', this.form)
				uni.showToast({
					title: '提交成功'
				})
			}
		}
	}
</script>

<style>
	.content {
		padding: 20px;
		background: linear-gradient(135deg, #fff7e6, #fff3e0);
		min-height: 100vh;
	}

	.form-container {
		background-color: #fff;
		padding: 20px;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.form-item {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		font-size: 14px;
		color: #333;
		margin-bottom: 8px;
		font-weight: 500;
	}

	.input,
	.picker-text,
	.textarea {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0 12px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	.input:focus,
	.textarea:focus {
		border-color: #ffc107;
		box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
	}

	.picker-text {
		color: #666;
		background-color: #f8f9fa;
	}

	.textarea {
		height: 100px;
		padding: 12px;
		line-height: 1.5;
	}

	.submit-btn {
		width: 100%;
		height: 48px;
		line-height: 48px;
		background: linear-gradient(135deg, #ffc107, #ffab00);
		color: #fff;
		border-radius: 8px;
		margin-top: 20px;
		font-size: 16px;
		font-weight: 500;
		border: none;
		transition: all 0.3s ease;
	}

	.submit-btn:active {
		transform: scale(0.98);
	}

	.submit-btn:hover {
		opacity: 0.9;
	}
</style>

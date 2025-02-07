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
				courierCompanies: ['顺丰', '中通', '圆通', '申通', '韵达']
			}
		},
		methods: {
			onCourierChange(e) {
				this.form.courier = this.courierCompanies[e.detail.value]
			},
			onSubmit() {
				// 提交表单逻辑
				console.log('提交的表单数据:', this.form)
				uni.showToast({
					title: '提交成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style>
	.content {
		padding: 20px;
	}

	.form-container {
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.form-item {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		font-size: 14px;
		color: #666;
		margin-bottom: 8px;
	}

	.input {
		width: 100%;
		height: 40px;
		padding: 0 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
	}

	.picker {
		width: 100%;
		height: 40px;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 0 12px;
		line-height: 40px;
		font-size: 14px;
	}

	.textarea {
		width: 100%;
		height: 100px;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
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

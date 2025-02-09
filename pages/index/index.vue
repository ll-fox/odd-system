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
				courierCompanies: ['顺丰速运', '圆通快递', '中通快递', '韵达快递', '京东物流', '邮政快递']
			}
		},
		onLoad() {

		},
		methods: {
			onCourierChange(e) {
				this.form.courier = this.courierCompanies[e.detail.value]
			},
			async onSubmit() {
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

				try {
					const res = await uniCloud.callFunction({
						name: 'feedback',
						data: this.form
					})

					if (res.result.code === 200) {
						uni.showToast({
							title: '提交成功'
						})
						// 清空表单
						this.form = {
							trackingNumber: '',
							courier: '',
							remark: ''
						}
					} else {
						uni.showToast({
							title: res.result.message || '提交失败',
							icon: 'none'
						})
					}
				} catch (error) {
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		padding: 20px;
		background: linear-gradient(180deg, #F5F5F7 0%, #FFFFFF 100%);
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
		color: #1C1C1E;
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
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.8);
		font-size: 14px;
		color: #1C1C1E;
	}

	.picker-text {
		color: #8E8E93;
	}

	.textarea {
		height: 100px;
		padding: 12px;
		line-height: 1.5;
	}

	.submit-btn {
		width: 100%;
		height: 44px;
		line-height: 44px;
		background: #007AFF;
		color: #fff;
		border-radius: 10px;
		margin-top: 20px;
		font-size: 16px;
		font-weight: 500;
		border: none;
		transition: all 0.2s ease;
	}

	.submit-btn:active {
		transform: scale(0.98);
		opacity: 0.9;
	}
</style>

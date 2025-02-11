<template>
	<view class="content">
		<view class="logo-container">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="form-container">
			<view class="form-item">
				<text class="label">快递单号</text>
				<input class="input" v-model="form.trackingNumber" placeholder="请输入快递单号" @input="onTrackingNumberInput" />
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
			<button class="submit-btn" @click="onSubmit">
				<text>提交</text>
			</button>
		</view>
	</view>
	<view v-if="loading" class="global-loading">
		<view class="loading"></view>
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
				loading: false
			}
		},
		onLoad() {

		},
		methods: {
			onCourierChange(e) {
				this.form.courier = this.courierCompanies[e.detail.value]
			},
			onTrackingNumberInput(event) {
				const value = event.detail.value;
				// 允许字母和数字，禁止汉字
				const filteredValue = value.replace(/[^\u0000-\u007F]/g, ''); // 过滤掉汉字
				this.$nextTick(() => {
					this.form.trackingNumber = filteredValue;
				});
			},
			async onSubmit() {
				if (this.loading) return;
				this.loading = true;
				
				if (!this.form.trackingNumber.trim()) {
					uni.showToast({
						title: '请填写快递单号',
						icon: 'none'
					});
					this.loading = false;
					return;
				}
				if (!this.form.courier) {
					uni.showToast({
						title: '请选择快递公司',
						icon: 'none'
					});
					this.loading = false;
					return;
				}

				try {
					const formData = {
						...this.form,
						status: '待处理'
					};

					const res = await uniCloud.callFunction({
						name: 'feedback',
						data: formData
					});

					if (res.result.code === 200) {
						uni.showToast({
							title: '提交成功'
						});
						this.form = {
							trackingNumber: '',
							courier: '',
							remark: ''
						};
					} else if (res.result.code === 400) {
						uni.showToast({
							title: res.result.message || '提交失败',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.result.message || '提交失败',
							icon: 'none'
						});
					}
				} catch (error) {
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'none'
					});
				} finally {
					this.loading = false;
				}
			}
		}
	}
</script>

<style>
	.logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 20px;
	}

	.logo {
		width: 70%;
		height: 90px;
	}

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

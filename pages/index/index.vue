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
	}

	.form-container {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
	}

	.form-item {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		font-size: 14px;
		color: #333;
		margin-bottom: 8px;
	}

	.input,
	.picker-text,
	.textarea {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.picker-text {
		color: #999;
	}

	.textarea {
		height: 100px;
		padding: 10px;
		line-height: 1.5;
	}

	.submit-btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #007aff;
		color: #fff;
		border-radius: 4px;
		margin-top: 20px;
	}
</style>

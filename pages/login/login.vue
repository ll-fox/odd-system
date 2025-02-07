<template>
	<view class="container">
		<button class="login-btn" @click="handleLogin">微信登录</button>
	</view>
</template>

<script>
	export default {
		methods: {
			async handleLogin() {
				try {
					console.log('开始获取code')
					const codeRes = await uni.login()
					if (codeRes.errMsg !== 'login:ok') {
						throw new Error('获取code失败')
					}
					console.log('获取到的code:', codeRes.code)
					
					console.log('开始获取用户信息')
					const res = await uni.getUserProfile({
						desc: '获取用户信息'
					})
					
					if (!res || !res.userInfo) {
						throw new Error('获取用户信息失败')
					}
					console.log('用户信息:', res.userInfo)
					
					console.log('调用云函数登录')
					const loginRes = await uniCloud.callFunction({
						name: 'wechat-login',
						data: {
							code: codeRes.code,
							userInfo: res.userInfo
						}
					})
					console.log('云函数返回:', loginRes)
					
					if (loginRes.result.code !== 0) {
						throw new Error(loginRes.result.msg || '登录失败')
					}
					
					// 保存token和用户信息
					uni.setStorageSync('token', loginRes.result.token)
					uni.setStorageSync('userInfo', res.userInfo)
					
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					
					// 跳转到首页
					uni.switchTab({
						url: '/pages/index/index'
					})
				} catch (error) {
					console.error('登录失败:', error)
					uni.showToast({
						title: error.message || '登录失败，请重试',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	
	.login-btn {
		width: 200px;
		height: 40px;
		line-height: 40px;
		background-color: #07c160;
		color: #fff;
		border-radius: 20px;
	}
</style> 
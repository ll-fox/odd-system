<script>
	export default {
		onLaunch() {
			// 初始化uniCloud
			uniCloud.init({
				provider: 'aliyun', // 根据你的云服务商选择
				spaceId: 'your-space-id',
				clientSecret: 'your-client-secret'
			})
			this.checkLogin()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			checkLogin() {
				const token = uni.getStorageSync('token')
				if (!token) {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

<template>
	<view class="yht-authorize" @click="cancel"
		:style="showDialog?'visibility: visible; opacity: 1;':'visibility: hidden; opacity: 0;'">
		<view @click.stop="" class="content" :style="{'bottom':showDialog? '0rpx':'-408rpx'}">
			<view class="content-title">咪咕用户协议及隐私保护</view>
			<view class="content-detail">
				为保障您的合法权益，请先阅读并同意
				<text class="theme-color" @click="open(1)">《咪咕用户服务协议》</text>
				及
				<text class="theme-color" @click="open(2)">《咪咕隐私权政策》</text>
			</view>
			<view class="btn-box">
				<view class="btn" @click="cancel">不同意</view>
				<!-- #ifdef MP-WEIXIN -->
				<!-- <button class="btn agree" open-type="getAuthorize" @click="login">同意并继续</button> -->
				<button class="btn agree" open-type="getUserInfo" @getuserinfo="login" ></button>
				<!-- #endif -->
			</view>
		</view>
	</view>

</template>

<script>
	import {
		login
	} from "@/utils/api.js"
	import {
		mapState
	} from 'vuex'
	export default {
		name: "yht-authorize",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			resultData: {
				type: Object,
				default: {}
			},
			bid: {
				type: String,
			},
		},
		watch: {
			show: {
				handler(val) {
					this.showDialog = val;
				},
				immediate: true
			},
			isGetInfo(val) {
				if (val) {
					console.log('登录页面的获取信息', val)
					this.cancel();
				}
			}
		},
		computed: {
			...mapState([
				'isGetInfo',
			])
		},
		mounted() {

		},
		data() {
			return {
				showDialog: false, //是否显示
				bkdetail_brief_book: {},
				wechat_taskorbookmark: {},
				checked: false, //是否勾选协议
			};
		},
		methods: {
			open(val) {
				let that = this,
					jupUrl = '',
					type = val || '',
					fileurl = '';
				// type:1：服务协议，2：隐私政策，3：关于我们
				if (type == 1) {
					fileurl = "https://passport.migu.cn/portal/protocol?sourceid=204001";
				} else if (type == 2) {
					fileurl = "https://wap.cmread.com/nap/p/pg/4449/mgys/index.htm";
				}
				jupUrl = '/pages/webViewTemp/webViewTemp?url=' + encodeURIComponent(fileurl);
				console.log(jupUrl);
				uni.navigateTo({
					url: jupUrl
				})
			},
			// 切换选中状态
			toggleCheck() {
				this.checked = !this.checked;
			},
			// 提示勾选
			warningCheck() {
				uni.showToast({
					title: '请先阅读并同意相关协议',
					icon: "none",
					duration: 2000,
				});
			},
			cancel() {
				console.log('取消取消取消取消取消取消取消')
				this.showDialog = false;
				this.$emit("cancel", this.showDialog)
			},
			login(e) {
				wx.login({
					success: function(res_login) {
						if (res_login.code) {
							console.log("res_login:", res_login)
							wx.getUserInfo({
								success: function (userResult) {
									console.log('用户',userResult)
								}
							})
							// 在此调用登录接口
							login({code:res_login.code}).then(res => {
								console.log('登录成功',res)
							})

						}
					},
					fail: function(res) {
						console.log("wx.login failed, res:" + res);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	button {
		background-color: transparent;
		padding: 0rpx;
		line-height: inherit;
		margin: 0;
		border-radius: 0rpx;
		cursor: default;
		font-size: 34rpx;
		border: none;

		&::after {
			border: none;
		}
	}

	.yht-authorize {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;

		.content {
			position: absolute;
			width: 100%;
			height: 408rpx;
			left: 0;
			bottom: 0;
			background-color: #fff;
			transition: all 0.5s 0s;
			box-shadow: 0px 6px 16px 0px rgba(70, 76, 86, 0.14);
			color: #464C56;
			border-radius: 40rpx 40rpx 0px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 80rpx;
			box-sizing: border-box;

			.content-title {
				font-size: 36rpx;
				font-weight: 500;
				color: #1F1F1F;
				line-height: 50rpx;
				margin-top: 54rpx;
			}

			.content-detail {
				font-size: 26rpx;
				font-weight: 400;
				color: #666666;
				line-height: 40rpx;
				margin-top: 16rpx;

				.theme-color {
					color: $yht-theme-color;
				}
			}

			.btn-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				// align-items: center;
				margin-top: 52rpx;

				.btn {
					width: 284rpx;
					height: 86rpx;
					border-radius: 48rpx;
					border: 1px solid #999999;
					font-size: 34rpx;
					font-weight: 500;
					color: #1F1F1F;
					line-height: 48rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.agree {
					background: $yht-theme-color;
					color: #FFFFFF;
					border: none;
				}
			}
		}
	}
</style>
<template>
	<view class="yht-mine">
		<view class="top">
			<view class="user">
				<!-- 已登录 -->
				<block v-if="isGetInfo">
					<image class="user-head" :src="userInfo.avatarUrl" mode="aspectFit"></image>
					<view class="user-name">{{userInfo.nickName}}<text class="dlGoArr"></text></view>
				</block>
				<!-- 未登录 -->
				<view v-else @click="showAuthorizePop = true" class="user">
					<image class="user-head"
						src="https://cdn.cmread.com/comment/image/5527c1c8a8d188a8056a73bd023f7c060f7d8ccc7f8a/pic.jpg"
						mode="aspectFit"></image>
					<view class="user-name">立即登录<text class="dlGoArr"></text></view>
				</view>
			</view>
		</view>
		<view class="pannel">
			<block v-if="isGetInfo">
				<navigator url='/pages/myorder/myorder' class="personalList">我的订购<text class="dlGoArr"></text>
				</navigator>
				<navigator url='/pages/myorder/myorder' class="personalList">我的收藏<text class="dlGoArr"></text>
				</navigator>
			</block>
			<block v-else>
				<button @click="showAuthorizePop = true" class="personalList">我的订购<text class="dlGoArr"></text></button>
				<button @click="showAuthorizePop = true" class="personalList">我的收藏<text class="dlGoArr"></text></button>
			</block>
			<navigator url="/pages/usinghelp/usinghelp" class="personalList">咨询客服<text class="dlGoArr"></text>
			</navigator>


		</view>
		<!-- 授权弹窗是否显示 -->
		<yhtAuthorizePop :show="showAuthorizePop" @cancel="authorizeCancel"></yhtAuthorizePop>

	</view>
</template>

<script>
	import yhtAuthorizePop from "@/components/yht-authorize/yht-authorize.vue"
	export default {
		components: {
			yhtAuthorizePop,
		},
		data() {
			return {
				showAuthorizePop: false, //授权弹窗是否显示

			};
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

		&::after {
			border: none;
		}
	}

	.yht-mine {
		min-height: 100vh;
		background-color: #F5F5F5;
		color: #464C56;

		.top {
			// height: 250rpx;
			height: 220rpx;
			background: $yht-theme-color;
			padding: 20rpx 0 0 34rpx;
			line-height: 90rpx;
			font-size: 32rpx;
			// position: relative;

			.user {
				width: 100%;
				display: flex;

				.user-head {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					float: left;
					margin-right: 22rpx;
					background-color: #f8f8f8;
				}

				.user-name {
					position: relative;
					color: #fff;
					// width: 145rpx;
					font-size: 32rpx;

					.dlGoArr {
						position: absolute;
						top: 34rpx;
						// top: 38rpx;
						// right: 4rpx;
						right: -16rpx;
						height: 18rpx;
						width: 18rpx;
						border-top: 2rpx solid #fff;
						border-right: 2rpx solid #fff;
						margin-left: 4rpx;
						transform: rotate(45deg);
						-webkit-transform: rotate(45deg);
					}
				}
			}
}

		.goCharge {
			height: 58rpx;
			line-height: 52rpx;
			font-size: 24rpx;
			color: #3778FF;
			min-width: 72rpx;
			padding: 0 20rpx;
			border: 2rpx solid #3778FF;
			border-radius: 40rpx;
			float: right;
			box-sizing: border-box;
			font-weight: normal;
		}

		.personalList {
			line-height: 114rpx;
			height: 114rpx;
			margin: 0 32rpx;
			border-bottom: 2rpx solid #f0f0f0;
			font-size: 28rpx;
			position: relative;
			text-align: left;

			.dlGoArr {
				position: absolute;
				right: 6rpx;
				height: 18rpx;
				width: 18rpx;
				border-top: 2rpx solid #989FA8;
				border-right: 2rpx solid #989FA8;
				top: 48rpx;
				transform: rotate(45deg);
				-webkit-transform: rotate(45deg);
			}
		}

		.adver-img {
			background: url(https://cdn.cmread.com/comment/image/5527c1c8acd188c8056a73bd054b84060c8135b48056/pic.jpg) no-repeat;
			background-size: 100%;
			width: 100%;
			height: 184rpx;
			border: none;
			box-sizing: none;
			border-bottom: none;
			overflow: hidden;
			border-radius: none;
			padding: 0;
		}

		.receive-banner {
			width: 100%;
		}

		.pannel {
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: -70rpx auto 24rpx auto;

		}
/*添加开通会员入口 start*/
		.personMember {
			position: absolute;
			background: url(http://cdn.cmread.com/comment/image/5527c1c8ab93b08405527d21c04eac0622707cfd5c44/BR017561-gray.png) no-repeat;
			background-size: 100% 92rpx;
			margin-top: 28rpx;
			width: 686rpx;
			height: 92rpx;
			bottom: 0rpx;
			left: 32rpx;

			.consumptionFund {
				position: absolute;
				left: 40rpx;
				top: 31%;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40rpx;
			}

			.memberDescConsumption {
				right: 214rpx !important;
			}

		}

		.personMember.huiyuanMe {
			background: url(http://cdn.cmread.com/comment/image/5527c1c8a293b2d005527d21622f770622707d55a411/BR017561-gold.png) no-repeat;
			background-size: 100%;
		}

		.personMember .memberPic {
			position: absolute;
			left: 30rpx;
			width: 192rpx;
			height: 36rpx;
			top: 31%;
		}

		.personMember .memberDesc {
			position: absolute;
			right: 172rpx;
			font-size: 24rpx;
			font-family: SourceHanSansCN-Normal, SourceHanSansCN;
			font-weight: 400;
			color: rgba(150, 159, 169, 1);
			text-align: center;
			line-height: 92rpx;

		}

		.personMember .memberDesc.fontcolor {
			color: #B38856;
		}

		// .personMember .memberDesc.fontcolor::after {
		// 	content: "";
		// 	position: absolute;
		// 	top: 50%;
		// 	right: -13rpx;
		// 	height: 18rpx;
		// 	width: 1px;
		// 	background-color: #464C56;
		// 	opacity: .3;
		// 	transform: translateY(-50%);
		// }

		.personMember .lookMember2 {
			font-size: 24rpx;
			font-family: SourceHanSansCN-Normal, SourceHanSansCN;
			font-weight: 400;
			color: rgba(70, 76, 86, 1);
			position: absolute;
			right: 60rpx;
			text-align: center;
			line-height: 92rpx;
		}

		.personMember .lookMember {
			width: 116rpx;
			height: 48rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 28rpx;
			border: 1px solid rgba(207, 132, 49, 1);
			position: absolute;
			right: 32rpx;
			text-align: center;
			line-height: 48rpx;
			font-size: 26rpx;
			color: rgba(207, 132, 49, 1);
			top: 22%;
		}

		.personMember .lookMemberSj {
			background: linear-gradient(58deg, #856138 0%, #382000 100%);
			color: #FFDDA6;
		}

		.personMember .lookMember2 .cmr-img {
			width: 16rpx;
			height: 16rpx;
			padding-left: 2rpx;
		}

		.personalList .balance {
			position: absolute;
			right: 34rpx;
			font-size: 32rpx;
			font-family: 'DIN Condensed' !important;
			font-weight: bold;
			color: rgba(70, 76, 86, 1);
		}

		.personalList .price {
			font-size: 26rpx;
			font-family: SourceHanSansCN-Normal, SourceHanSansCN;
			font-weight: 400;
			color: rgba(70, 76, 86, 1);
		}

		/*添加开通会员入口 end*/
	}
</style>
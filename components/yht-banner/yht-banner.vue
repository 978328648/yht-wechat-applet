<template>
	<view>
		<swiper index="999" autoplay="true" circular="true" class="swiper-banner" @change="bannerchanger"
			@transition="transition">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="banner-item">
					<!-- 注意图片路径 -->
					<view @click="onKip(item,index)" class="navbox">
						<image :src="`http://www.a57521.com:8008/${item.url}`"
							mode="aspectFill" v-if="true||item && item.picUrl" lazy-load="true" class="booklog"></image>
						<!-- <image src="https://cdn1.cmread.com/ues/61/55273d99ec7ed80ab80415caab35d6092e61/pic.jpg"
							mode="aspectFill" v-if="true||item && item.picUrl" lazy-load="true" class="booklog"></image> -->
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 自定义指示器 -->
		<view class="add-dots" v-if="list.length > 1">
			<view style="display: inline-block;" v-for="(items,index) in list" :key="index">
				<text :class="(index==bannerIndex) ? 'dots-Active' : 'dotSlots'"></text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: ["list"],
		data() {
			return {
				bannerIndex: 0,
				dataList: this.list
			};
		},
		mounted() {
			// console.log('list', this.list)
		},
		methods: {
			transition(e) {
				// console.log('banner-transition',e)
			},
			bannerchanger(e) {
				let index = e.target.current || e.detail.current;
				this.bannerIndex = index;
			},
			onKip(item, index) {
				let jupUrl = `/pages/detail/detail`;
				this.$utils.onkip(jupUrl)
			},
			getCaption(obj) {
				var index = obj.indexOf("vt=");
				obj = obj.substring(index + 3, obj.length);

				console.log('obj', obj)
				return obj;
			},
		}
	}
</script>

<style lang="scss">
	/* banner图 */
	.swiper-banner {
		navigator {
			width: 100%;
			height: 100%;
		}

		height: 280rpx;
		// margin-top:24rpx;

		.navbox {
			width: 100%;
			height: 100%;
		}

		.banner-item {
			height: 280rpx;
			border-radius: 12rpx;

			.booklog {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 12rpx;
			}
		}
	}

	/* banner指示器 */
	.add-dots {
		text-align: center;
		margin-top: -20px;
		.dots-Active {
			display: inline-block;
			// width: 32rpx;
			// height: 10rpx;
			width: 22rpx;
			height: 6rpx;
			background: linear-gradient(270deg, rgba(150, 159, 169, 0.5) 0%, #F5F7FA 100%);
			border-radius: 6rpx;
			margin-left: 18rpx;
			transition: all .5s;
		}

		.dotSlots {
			display: inline-block;
			// width: 10rpx;
			// height: 10rpx;
			width: 6rpx;
			height: 6rpx;
			background: #969FA9;
			border-radius: 6rpx;
			opacity: 0.5;
			margin-left: 18rpx;
			transition: all .5s;
		}
	}
</style>
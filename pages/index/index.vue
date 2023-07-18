<template>
	<view class="yht-index">
		<!-- 活动图 -->
		<img :src="`${imgUrl}${activityList[0].activity_url}`" v-if="activityList.length !== 0" alt="" srcset="" class="active-class">
		<!-- 轮播图 -->
		<yhtBanner v-if="bannerList.length !== 0" :list="bannerList"></yhtBanner>
		<!-- 分类标签 -->
		<view class="page-section">   
			<view class="page-section-spacing" style="padding: 0.2rem;">
				<view class="flex-wrp" >
					<view v-for="(items,index) in sortList" :key="index" class="flex-item">
						<img :src="`${imgUrl}${items.sort_img}`" class="flex-item-img" />
						<text >{{items.sort_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="ComBox">
			<div class="ComList" v-for="item in ComListSon" :key="item.product_id" @click="ToDel(item.product_id)">
				<div class="ImgBOX">
					<img :src="`${imgUrl}${item.product_img_list}`" class="Img" alt="">
				</div>
				<div class="Title">
					{{item.product_name}}
				</div>
				<div class="Price">
					￥{{item.product_price}}
				</div>
			</div>
		</view>
		<view class="allListShow" v-if="listAllShow">
			--没有更多了--
		</view>
		<!-- <view class="list-item" v-for="(item,index) in list">
			<view class="colum">
				姓名：{{item.username}}
			</view>
			<view class="colum">
				性别：{{item.sex}}
			</view>
			<view class="colum">
				住址：{{item.address}}
			</view>
			<view class="colum">
				年龄：{{item.age}}
			</view>
			<button class="colum" @click="updateInfo(item)">
				年龄+1
			</button>
		</view> -->
		<view class="text-area">
			<!-- <text class="title">{{title}}</text> -->
			<!-- <button @click="addInfo">新增豹豹信息</button> -->
			<!-- <button @click="updateInfo">修改豹豹信息为草荡苑</button> -->
		</view>
	</view>
</template>

<script>
	import {
		API
	} from "../../utils/api.js"
	import {
		dataIndextj,
		getListTest,
		addTest,
		updateTest,getBanner,getActivityList,getSortList,getProductList
	} from "@/utils/api.js"
	import {http} from "@/utils/http.js"
	import yhtBanner from "@/components/yht-banner/yht-banner.vue"
	export default {
		components: {
			yhtBanner,
		},
		data() {
			return {
				title: 'Hello',
				imgUrl:'https://www.a57521.com/images/',
				bannerList: [],
				activityList: [],
				sortList:[],
				ComListSon: [],
				page: 1, //页数
				pageSize:10,
				listAllShow:false,//加载完了
			}
		},
		onLoad() {
			this.getBannerFun(); //获取首页轮播图
			this.getActivityListFun() //获取活动列表
			this.getSortListFun() //分类
			this.page = 1
			this.getComList(this.page)
		},
		onReachBottom: function() {
			if(!this.listAllShow){
				//下拉触发事件
				this.page++;
				this.getComList(this.page);
				console.log('触发了下拉加载更多的事件')
			}
		},
		methods: {
			// 获取首页banner图
			getBannerFun() {
				getBanner().then(res => {
					this.bannerList = res?.data;
				})
			},
			getActivityListFun(){
				getActivityList().then(res => {
					this.activityList = res?.data;
				})
			},
			getSortListFun(){
				getSortList().then(res => {
					this.sortList = res?.data;
				})
			},
			ToDel(id) {
				//参数在跳转页的onLoad(id){ console.log('id为' + id) } 中获取  
				wx.showToast({
					title: '将要跳转的详情页id为' + id,
					icon: 'none',
					duration: 500
				});
			},
			getComList(page) { //参数为页数
				// 将获取的第page页数据合并进原数组   举例
				getProductList({
					page,
					pageSize:this.pageSize,
				}).then(res => {
					if(res.success){
						if(res.data.length < this.pageSize){
							this.listAllShow = true
						}
						this.ComListSon.push(...res.data)
					}else{
						wx.showToast(
						{ title: res.mes?res.msg:'信息获取错误',
						icon: 'none', duration: 500 });
					}
					
				})
			},
			addInfo() {
				addTest({
					username: '豹豹',
					address: '杭州',
					age: 4,
					sex: '女',
				}).then(res => {
					console.log('新增成功！',res)
				})
			},
			updateInfo(item) {
				updateTest({
					id: item.id,
					username: item.username,
					address: item.address,
					age: item.age+1,
					sex: item.sex,
				}).then(res => {
					uni.showToast({
						title:'新增成功'
					})
					this.getListTest();
					console.log('新增成功！',res)
				})
			}
			
		},
		
	}
</script>

<style lang="scss">
	.allListShow{
		    text-align: center;
		    height: 70rpx;
		    line-height: 70rpx;
		    font-size: 30rpx;
		    color: #cccccc;
	}
	.ComBox {
			width: 690rpx; //根据微信定义设置  如非必要不建议改为100%；
			padding: 10rpx 30rpx;
			background-color: #f7f7f7;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.ComList {
				//未设置高度
				width: 270rpx;
				padding: 30rpx;
				background: #fff;
				border-radius: 8rpx;
				margin-top: 30rpx;
				.ImgBOX {
					width: 270rpx;
					height: 270rpx;
					border-radius: 12rpx;
					.Img {
						width: 100%;
						height: 100%;
					}
				}
				.Title {
					width: 270rpx;
					font-size: 32rpx;
					line-height: 44rpx;
					height: 88rpx;
					padding-top: 15rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.Price {
					width: 100%;
					height: 44rpx;
					line-height: 44rpx;
					padding-top: 15rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #D12324;
				}
			}
		}
	.flex-wrp{
		flex-direction:row;  display:flex;flex-flow:row wrap;
		flex-direction: row;
		display: flex;
		flex-flow: row wrap;
		padding: 0.5rem 0.5rem;
		border: 1px dashed #d4237a;
	}
	.flex-item{
		width: 33%;
		height: 3rem;
		text-align: center;
		font-size: 0.8rem;
		display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		  align-items: center;
		margin-top: 0.5rem;
		
		    
	}
		
	.flex-item-img{
		width: 50%;
		height: 2rem;
	}
	.active-class{
		width: 100%;
		height: 350rpx;
	}
	
	.yht-index {
		min-height: 100vh;
		/* padding: 0 20rpx; */
		box-sizing: border-box;
		overflow: hidden;
		background-color: #F5F5F5;
	}


	.list-item {
		display: flex;
		justify-content: space-between;
		
		
	}
	.colum {
		width: 200rpx;
	}
</style>

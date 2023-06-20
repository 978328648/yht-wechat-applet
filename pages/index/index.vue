<template>
	<view class="yht-index">
		<img :src="`http://www.a57521.com:8008/${activityList[0].activity_url}`" v-if="activityList.length !== 0" alt="" srcset="" class="active-class">
		<yhtBanner v-if="bannerList.length !== 0" :list="bannerList"></yhtBanner>
		
		<view v-for="(items,index) in sortList" :key="index">
			<text>{items.sortName}</text>
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
		updateTest,getBanner,getActivityList,getSortList
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
				bannerList: [],
				activityList: [],
				sortList:[],
			}
		},
		onLoad() {
			this.getBannerFun(); //获取首页轮播图
			this.getActivityListFun() //获取活动列表
			this.getSortListFun() //分类
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
			
		}
	}
</script>

<style>
	.active-class{
		width: 100%;
		height: 200rpx;
	}
	
	.yht-index {
		min-height: 100vh;
		padding: 0 20rpx;
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

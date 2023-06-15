<template>
	<view class="yht-index">
		<yhtBanner v-if="list.length !== 0" :list="list"></yhtBanner>
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
		updateTest,getBanner
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
				list: [],
			}
		},
		onLoad() {
			this.getBannerFun();
		},
		methods: {
			// 获取首页banner图
			getBannerFun() {
				getBanner().then(res => {
					this.list = res.imgList;
					console.log('this.list',this.list)
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

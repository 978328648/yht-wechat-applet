import moment from "@/utils/moment.min.js"
import {
	wxGetWalletInfo,
	asyncAuthenticate,
	wechat_isOrder
} from '@/utils/api.js'
//公共js，主要做表单验证，以及基本方法封装
const utils = {
	isNullOrEmpty: function(value) {
		//是否为空
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	// 判定是否为空
	empty: function(v) {
		let tp = typeof v,
			rt = false;
		if (tp == 'number' && String(v) == '') {
			rt = true;
		} else if (tp == 'undefined') {
			rt = true;
		} else if (tp == 'object') {
			if (JSON.stringify(v) == '{}' || JSON.stringify(v) == '[]' || v == null) rt = true;
		} else if (tp == 'string') {
			if (v == '' || v == 'undefined' || v == 'null' || v == '{}' || v == '[]') rt = true;
		} else if (tp == 'function') {
			rt = false;
		}
		return rt;
	},
	trim: function(value) {
		//去空格
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	isMobile: function(value) {
		//是否为手机号
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	isFloat: function(value) {
		//金额，只允许保留两位小数
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
	},
	isNum: function(value) {
		//是否全为数字
		return /^[0-9]+$/.test(value);
	},
	checkPwd: function(value) {
		//密码为8~20位数字和字母组合
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
	},
	formatNum: function(num) {
		//格式化手机号码
		if (utils.isMobile(num)) {
			num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
		}
		return num;
	},
	rmoney: function(money) {
		//金额格式化
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,')
			.replace(
				/\,$/, '').split('').reverse().join('');
	},
	formatDate: function(formatStr, fdate) {
		//日期格式化
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
	},
	/* 将毫秒转换成时分秒 */
	formatDuring: function(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = (mss % (1000 * 60)) / 1000;
		return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
	},
	dateString: function(date) {
		// var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		return day;
	},
	objParseUrlAndParam: function(path, query) {
		return '' + path + "?" + this.toQueryString(query);
	},

	toQueryPair: function(key, value) {
		if (typeof value == 'undefined') {
			return key;
		}
		// return key + '=' + encodeURIComponent(value === null ? '' : String(value));
		return key + '=' + (value === null ? '' : String(value));
	},

	toQueryString: function(obj) {
		var ret = [];
		for (var key in obj) {
			// key = encodeURIComponent(key);
			var values = obj[key];
			if (values && values.constructor == Array) { //数组
				var queryValues = [];
				for (var i = 0, len = values.length, value; i < len; i++) {
					value = values[i];
					queryValues.push(this.toQueryPair(key, value));
				}
				ret = ret.concat(queryValues);
			} else { //字符串
				ret.push(this.toQueryPair(key, values));
			}
		}
		return ret.join('&');
	},
	// 时间转换函数
	timeFun(time, nowtime) {
		let timeStr = ''
		if (moment(nowtime).format("YYYYMMDD") == moment(time).format("YYYYMMDD")) {
			// 今天
			timeStr = '今天 ' + moment(time).format("kk:mm")
		} else if (moment(time).format("YYYY") < moment(nowtime).format("YYYY")) {
			// 往年
			timeStr = moment(time).format("YYYY-MM-DD")
		} else {
			// 今年
			timeStr = moment(time).format("MM-DD kk:mm")
		}
		return timeStr ? timeStr : ''
	},
	/**
	@ method  formateTime | 将传入的时间字符串按给定的模板输出，如传入2017-08-16 00：00：00 输出 0816 this.formateTime('2017/08/16 19:11:11',"YY-MM-DD hh'mm'ss") "2017-08-16 19'11'11"
	@ param  str | {String} | 传入的需要转换的时间字符串，必须严格遵照时间格式 如2017-08-16 00：00：00
	@ param  tEx | {String} | 需要输出的时间字符串格式模板，如 “YYHHMM hh:mm:ss”
	@ param  fixZero | {Boolean} | 是否需要给年月日补全
	**/
	formateTime(str, tEx, fixZero) {
		str = str || "2000-01-01 00:00:00";
		tEx = tEx || "YY-MM-DD hh:mm:ss";
		fixZero != false ? fixZero = true : null;
		str = str.replace(/-/g, "/");
		var sDate = new Date(str),
			YY = sDate.getFullYear(),
			MM = (fixZero == true ? this._fixZero(sDate.getMonth() + 1) : sDate.getMonth() + 1),
			DD = (fixZero == true ? this._fixZero(sDate.getDate()) : sDate.getDate()),
			hh = this._fixZero(sDate.getHours()),
			mm = this._fixZero(sDate.getMinutes()),
			ss = this._fixZero(sDate.getSeconds());
		return tEx.replace(/YY/g, YY).replace(/MM/g, MM).replace(/DD/g, DD).replace(/hh/g, hh).replace(/mm/g, mm)
			.replace(/ss/g, ss);
	},

	/**
	  @ method  _fixZero | 给个位数的字符串添加0变成两位数
	  **/
	_fixZero(str) {
		str = str || "0";
		try {
			str = String(str);
			str.length <= 1 ? str = "0" + str : null;
		} catch (e) {
			console.log('_fixZero error')
		}
		return str;
	},
	imgHttps(str) {
		if (str.indexOf('https:') == 0) {
			str = str.substring(6, str.length)
		}
		return str
	},
	handleUESImg(url, ext) {
		console.log('url', url)
		// url = 'content/repository/ues/image/s380/20190605085737578.png;5527c1c8a1e2577c056a73be2ada2a05cf71381ba5d4'

		ext = ext || "";
		if (!url) {
			return url;
		}
		if ((/http|https|\/\//g).test(url) != true) {
			//不是绝对地址
			//UES直接选择的：content/repository/ues/image/s380/20190605085737578.png;5527c1c8a1e2577c056a73be2ada2a05cf71381ba5d4
			// content/repository/ues/image/s380/b112980a3e94a542f0f9e38af1dfb1b.png;5527c1c8a1d188c8056a750e9f1076061b2b4a67fd19
			if ((/;/g).test(url)) {
				console.log('分号')
				//匹配到是UES地址
				try {
					var atmosId = url.split(";")[1] || "",
						extendArr = url.split(";")[0].split(".");
					ext ? null : ext = extendArr[extendArr.length - 1];
					// console.log('url1', '//cdn.cmread.com/comment/' + "image/" + atmosId + "/pic." + ext);
					return '//cdn.cmread.com/comment/' + "image/" + atmosId + "/pic." + ext;
				} catch (e) {
					// console.log('url2', "//wap.cmread.com/" + url);
					return "//wap.cmread.com/" + url;
				}
			} else {
				// console.log('url3', "//wap.cmread.com/" + url);
				//匹配到不是ues相对地址，则拼上域名
				return "//wap.cmread.com/" + url;
			}
		} else {
			return url;
		}
	},
	imgFormatHttps(str) {
		// https
		if (str.indexOf('https:') == 0) {
			return str
			// str = str.substring(6, str.length)
		} else if (str.indexOf('http:') == 0) {
			str = 'https:' + str.substring(5, str.length)
			// https
			return str;
		} else {
			//无前缀
			return 'https:' + str
		}
	},
	// 接口获取手机号
	getPhoneNum(data) {
		wxGetWalletInfo({
			vt: 9,
			pluginCode: 'getWalletInfo',
		}).then(res => {
			// console.log('接口获取手机号', res)
			this.phoneNum = res.getPersonalInfo.data.personalInfo && res.getPersonalInfo.data.personalInfo
				.userMoblie || '';
			uni.setStorageSync('userMoblie', this.phoneNum)
			getApp().globalData.userMoblie = this.phoneNum;
			if (uni.getStorageSync('userMessage')) {
				this.$store.commit('changeIsGetInfo', true)
			}
		})
	},
	// 获取用户信息
	getUserProfile(data) {
		// console.log('getUserProfile-data', data)
		// console.log('this.canIUseGetUserProfile', this.canIUseGetUserProfile)
		let that = this
		this.loginType = data;
		let getType = ['getUserInfo', 'getUserProfile'][this.canIUseGetUserProfile ? 1 : 0] //获取用户信息方式
		wx.login({
			success: function(res_login) {}
		})
		wx[getType]({
			desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (userProfile) => {
				uni.setStorageSync('userMessage', userProfile)
				// console.log('昵称、头像、地区及性别', userProfile)
				that.authFun(userProfile, data)
				uni.login({
					success: function(res_login) {
						// console.log('res_login', res_login)
						let jsonData = {
							reqParams: {
								code: res_login.code,
								userInfo: JSON.stringify(userProfile),
								portalType: '32'
							}
						};
						asyncAuthenticate(jsonData).then(res => {
							if (res.openId) {
								uni.setStorageSync('unionId', res.unionId)
								uni.setStorageSync('openId', res.openId)
								uni.setStorageSync('lastLoginTime', new Date().toLocaleDateString());
								uni.setStorageSync('at', res.at)
								getApp().globalData.at = res.at;
								that.getPhoneNum(data)
							}
						})
					}
				})
			}
		})
	},
	authFun(userProfile, data) {
		let that = this
		uni.login({
			success: function(res_login) {
				// console.log('res_login', res_login)
				let jsonData = {
					reqParams: {
						code: res_login.code,
						userInfo: JSON.stringify(userProfile),
						portalType: '32'
					}
				};
				asyncAuthenticate(jsonData).then(res => {
					if (res.openId) {
						uni.setStorageSync('unionId', res.unionId)
						uni.setStorageSync('lastLoginTime', new Date().toLocaleDateString());
						uni.setStorageSync('openId', res.openId)
						uni.setStorageSync('at', res.at)
						getApp().globalData.at = res.at;
						that.getPhoneNum(data)
					} else {
						// console.log('空的')
						setTimeout(() => {
							// that.getUserProfile();
							// that.authFun(userProfile);
						}, 2000)
					}
				})
			}
		})
	},
	// 获取手机号->绑定手机
	getPhoneNumber(e) {
		// console.log('e', e.detail)
		let that = this;
		if (e.detail.errMsg == "getPhoneNumber:ok") {
			that.$plugin.apiBindWechatMobileAndLogin({
				sourceId: getApp().globalData.sourceId,
				iv: encodeURIComponent(e.detail.iv),
				enc: encodeURIComponent(e.detail.encryptedData),
				sessionId: that.sessionId,
				success: function(result) {
					that.bindPhone();
					setTimeout(function() {
						//关闭绑定对话框，刷新活动页面
						that.state = 0;
						that.$emit('stateChange', that.state)
					}, 1000);
				},
				fail: function(error) {
					uni.showToast({
						title: error,
						icon: 'none',
						duration: 2000
					});
					//关闭绑定对话框，刷新活动页面
					that.state = 0;
					that.$emit('stateChange', that.state)
				}
			})
		} else {
			that.state = 2;
			that.$emit('stateChange', that.state)
		}
	},
	// 获取用户信息
	bindPhone() {
		// console.log('mixin---bindPhone')
		let that = this
		// let getType = ['getUserInfo', 'getUserProfile'][this.canIUseGetUserProfile ? 1 : 0] //获取用户信息方式
		uni.login({
			success: function(loginResult) {
				// console.log('loginResult', loginResult)
				wx.getUserInfo({
					desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (userResult) => {
						// console.log('昵称、头像、地区及性别', userResult)
						// uni.login({
						// 	success: function(loginResult) {
						// 		console.log('loginResult', loginResult)
						let userInfo = JSON.stringify({
							nickName: userResult.userInfo.nickName,
							gender: userResult.userInfo.gender,
							avatarUrl: encodeURIComponent(userResult.userInfo
								.avatarUrl),
							country: userResult.userInfo.country,
							province: userResult.userInfo.province,
							city: userResult.userInfo.city,
							language: userResult.userInfo.language
						})
						console.log('userInfo', userInfo)
						let loginData = {
							sourceId: getApp().globalData.sourceId,
							code: encodeURIComponent(loginResult.code),
							iv: encodeURIComponent(userResult.iv),
							enc: encodeURIComponent(userResult.encryptedData),
							userInfo: userInfo,
						}
						console.log('loginData', loginData)
						//获取miguToken
						that.$plugin.apiMiguWechatLogin({
							...loginData,
							// sourceId: getApp().globalData.sourceId,
							// code: encodeURIComponent(loginResult.code),
							// iv: encodeURIComponent(userResult.iv),
							// enc: encodeURIComponent(userResult.encryptedData),
							// userInfo: userInfo,
							success: function(result) {
								that.$plugin.getMiguToken({
									success: function(miguToken) {
										console.log('miguToken',
											miguToken)
										if (miguToken != null) {
											// 页面显示  
											that.miguToken =
												miguToken;
											getApp().globalData
												.userInfo =
												userResult.userInfo;
											var jsonData = {
												reqParams: {
													code: loginResult
														.code,
													userInfo: JSON
														.stringify(
															userResult
														),
													portalType: '32',
													miguToken: miguToken
												}
											};
											console.log('jsonData',
												jsonData)
											// 登录
											asyncAuthenticate(
												jsonData).then(
												res => {
													console.log(
														"======1:成功；2:失败；4401：用户正在绑定中；4402：用户绑定冲突，请联系客服处理========="
													)
													console.log(
														'resultCode:',
														res
														.resultCode
													);
													if (res
														.resultCode ==
														"1") {
														uni.setStorageSync('at',res.at); //2021.4.12等联调的时候需打开此判断
														getApp()
															.globalData
															.tokenId = res.at;
														getApp()
															.globalData
															.unionid =
															res
															.unionId;
														getApp()
															.globalData
															.openid =
															res
															.openId;
														uni.setStorageSync(
															'openId',
															res
															.openId
														); //为了规避登录后全局openid有时候丢失问题
														that
															.getPhoneNum();
														uni
															.hideLoading();
														uni.showToast({
															title: '绑定成功',
															icon: 'none',
															duration: 2000
														});
														setTimeout
															(function() {
																	// that.getRechangeList();
																},
																1000
															);
														//登录成功刷新页面
														that.phoneNum =
															"咪咕一级登录成功";
													} else if (
														res
														.resultCode ==
														"4401"
													) {
														that
															.bindPhone();
	
													} else if (
														res
														.resultCode ==
														"4402"
													) {
														uni
															.hideLoading();
														uni.showToast({
															title: '用户绑定冲突，请联系客服处理',
															icon: 'none',
															duration: 2000
														});
													} else {
														uni
															.hideLoading();
														uni.showToast({
															title: '绑定失败，请联系客服处理',
															icon: 'none',
															duration: 2000
														});
													}
												})
	
										}
									},
									fail: function(error) {
	
									}
								})
							},
							fail: function(error) {
								uni.hideLoading();
								uni.showToast({
									title: '微信登录失败',
									icon: 'none',
									duration: 2000
								});
								uni.hideLoading();
							},
							bindmsisdn: function(bindParam) {
								//需要弹出绑定框
								that.sessionId = bindParam.sessionId;
								// that.bindpopstate = 1;
								that.popState = 1;
	
								uni.hideLoading();
							}
						})
						// 	}
						// })
					},
					fail: (userError) => {
						if (userError.errMsg == "getUserInfo:fail auth deny") {
							uni.showToast({
								title: '获取微信用户信息失败，请先授权',
								icon: 'none',
								duration: 2000
							});
							uni.hideLoading();
						} else {
							uni.showToast({
								title: '获取微信用户信息失败，请检查网络状态',
								icon: 'none',
								duration: 2000
							});
							uni.hideLoading();
						}
	
					},
				})
			}
		})
	},
	aliGetPhone() {
		// this.loginType = loginType;
		// console.log('loginType',loginType)
		uni.showLoading({
			title: '正在登录中...',
		});
		// #ifdef MP-ALIPAY
		my.getAuthCode({
			scopes: 'auth_base',
			success: (code) => {
				console.log('getAuthCode', code.authCode)

				my.getPhoneNumber({
					success: (res) => {
						console.log('getPhoneNumber-success', res)
						let data = {
							reqParams: {
								encryptedData: res.response,
								code: code.authCode,
								appId: '2021001161613287',
								portalType: 33,
							}
						}
						let encryptedData = res.response;
						asyncAuthenticate(data).then((res => {
							console.log('登录返回res', res)
							if (res.at) {
								uni.hideLoading();
								uni.setStorageSync('openId',res.openId)
								uni.setStorageSync('lastLoginTime', new Date().toLocaleDateString());
								uni.setStorageSync('at', res.at)
								getApp().globalData.at = res.at;
								this.$store.commit('changeIsGetInfo', true)
								this.$emit("loginSuccess")
							}
						})).catch(() => {
							uni.hideLoading();
						})
						// my.request({
						//     url: '你的后端服务端',
						//     data: encryptedData,
						// });
					},
					fail: (res) => {
						console.log('getPhoneNumber-fail', res)
						uni.hideLoading();
					},
				});
			},
			fail: (res) => {
				uni.hideLoading();
			},
		});
		// #endif
	},
	getWechatIsOrder() {
		return new Promise((resolve, reject) => {
		wechat_isOrder({
			'vt': 9
		}).then(res => {
			if (res.getOrder && res.getOrder.status == '200') {
				// 1 显示 2不显示  
				let result = res.getOrder.data.paramMap.wechat_isOrder || '2'
				// this.wechat_isOrder = result;
				resolve(result)
			}else{
				reject(res)
			}
		})
		})
	},
	getOrderAlipay() {
		return new Promise((resolve, reject) => {
		wechat_isOrder({
			'vt': 9
		}).then(res => {
			if (res.getOrder && res.getOrder.status == '200') {
				// 1 显示 2不显示  
				let result = res.getOrder_alipay.data.paramMap.wechat_isOrder || '2'
				// this.wechat_isOrder = result;
				resolve(result)
			}else{
				reject(res)
			}
		})
		})
	},
		// 跳转
		onkip(url) {
			let that = this;
			console.log('url', url);
			if (url != "" && (url.indexOf('/pages/') >= 0)) {
				url = url.replace("/nap", "");
				console.log("url1:", url)
				if (url.indexOf('/personalcenter') >= 0||url.indexOf('/book/book') >= 0||url.indexOf('/bookstack/bookstack') >= 0||url.indexOf('/index/index') >= 0||url.indexOf('/welfare/welfare') >= 0) {
					uni.switchTab({
						url: url
					})
				}else{
					uni.navigateTo({
						url: url
					})
				}
			} else if (url != "") {
				url = '/pages/webview/webview-1?url=' + encodeURIComponent(url);
				console.log("url2:", url)
				uni.navigateTo({
					url: url
				})
			}
		},
		DateDiff(lastTime) {
			// let startTime = new Date('2022-4-20'); // 开始时间
			let startTime = new Date(lastTime); // 开始时间
			let endTime = new Date(); // 结束时间
			let usedTime = endTime - startTime; // 相差的毫秒数
		
			let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
			let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
			let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
			let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
			let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
			// console.log('new Date()',new Date());
			// console.log(days + '天' + hours + '时' + minutes + '分');
			let timeData = {
			  days: days,
			  hours: hours,
			  minutes: minutes,
			}
			return timeData;
		},
		unique(arr, key) {
			const res = new Map()
			return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1))
		},

}
export default {
	utils,
}
// module.exports = {
// isNullOrEmpty: utils.isNullOrEmpty,
// empty: utils.empty,
// trim: utils.trim,
// isMobile: utils.isMobile,
// isFloat: utils.isFloat,
// isNum: utils.isNum,
// checkPwd: utils.checkPwd,
// formatNum: utils.formatNum,
// rmoney: utils.rmoney,
// formatDate: utils.formatDate,
// formatDuring: utils.formatDuring,
// dateString: utils.dateString,
// toQueryPair: utils.toQueryPair,
// toQueryString: utils.toQueryString,
// objParseUrlAndParam: utils.objParseUrlAndParam,
// timeFun: utils.timeFun,

// }

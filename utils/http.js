
// import jsencrypt from "@/utils/jsencrypt.js"
import store from '@/store'
const baseUrl = {
	// API_HOST: "https://m.cmread.com",//现网
	API_HOST: "http://192.168.31.115:9090",//我的ip
	// API_HOST: "https://wap.cmread.com",
	// API_HOST: "https://mtest.cmread.com:8145",
	// API_HOST: "http://192.168.178.69:8080",//sit
	 // API_HOST: "https://mtest.cmread.com:6443",//测试sit（废弃）
	 // API_HOST: "https://nag-sit.cmread.com:10443",//新sit
	// API_HOST: "https://www.kugoufeng.xyz",
	// API_HOST: "https://mpr.cmread.com",
	// API_HOST: "http://10.129.42.83:8080",//st？
	// API_HOST: "http://10.129.42.84:8080",
	// API_HOST: "http://sttest.cmread.com",//st

}

export const http = (parapms) => {
	let {
		url,
		method,
		header,
		data,
		notForm,
		atType
	} = parapms;

	// console.log('request-data',data)
	//请求方式 GET　POST 
	method = method.toUpperCase(); 
	if (method && method == "POST") {
		header = {
			// "content-type": notForm ? 'application/json' : 'application/x-www-form-urlencoded', //在发送前编码所有字符
			"content-type": 'application/json', //在发送前编码所有字符
			"X-Terminal-ID": uni.getStorageSync("unionId") || "",
			"Accept": "application/json",
			"x-forwarded-for": '10.73.155.158',
			"X-LOGIN-WAY": 9,
			"X-APPID": '2021001161613287',
		}
	}else{
		// method = 'GET';
		header = {
			'content-type': notForm ? 'application/json':'application/json',
			"X-APPID": '2021001161613287',
		};
	}
	if(atType != "no") {
		let at = '';
		if(getApp().globalData.at) {
			at = getApp().globalData.at;
		}else {
			at = uni.getStorageSync('at');
		}
		// header["x-at"] = at ? jsencrypt.ENCRYPT(at + `,${new Date().getTime()}`|| "") : '';
	}
	// atType != "no" && (header["x-at"] = at ? jsencrypt.ENCRYPT(at + `,${new Date().getTime()}`|| ""): '');

	//发起请求
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl.API_HOST + url,
			method,
			header,
			data,
			success: res => {
				// console.log('res-发起请求',res)
				let _loginErrorCode = res.header['X-Wechat-Login-Code'];
				let _loginErrorCodePc = res.header['x-wechat-login-code'];
				// console.log('res.header',res.header)
				
				if (_loginErrorCode == '30019' || _loginErrorCodePc == '30019'){
					// uni.clearStorageSync();
					uni.removeStorageSync('at');
					getApp().globalData.at = ''
					store.commit('changeIsGetInfo',false)
				}
				resolve(res.data)
			},
			fail: res => {
				reject(res)
			},
			complete: () => {
				uni.hideLoading();
			}
		})
	})

}

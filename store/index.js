import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
        "isGetInfo": uni.getStorageSync('at') ? true : false,
    },
	getters: {
		
	},
	mutations: {
		changeIsGetInfo(state,payload) {
			// 接受一个状态 true/false
			state.isGetInfo = payload;
		}
	}
})
export default store
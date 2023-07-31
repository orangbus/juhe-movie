import {defineStore} from "pinia";
import router from "../router/index.js";
import LocalStorage from "../utils/LocalStorage.js";
import EnumData from "../utils/EnumData.js";
import {website} from "../api/index.js";
import {movieApiList} from "../api/movie.js";
import { videoApiList} from "../api/video.js";

export const useUserStore = defineStore("userStore",{
	state:()=>({
		auth:false,
		user:{
			name: "",
			phone: ""
		}
	}),
	actions:{
		getUserInfo(){

		},
		userLogOut(){
			this.user = null;
			this.auth = false;

			router.push({
				path:"/login"
			})
		},
		setUser (user){
			LocalStorage.set(EnumData.userLabel,user);
			this.user = user;
			this.auth = true;
		},

		// 加载用户
		loadUser() {
			const user = LocalStorage.get(EnumData.userLabel);
			const auth = LocalStorage.get(EnumData.authorizationLabel);
			this.user = user;
			this.auth = auth;
		}
	}
})

export const useMovieStore = defineStore("movieStore", {
	state: () => {
		return {
			movieApi:{}, // 当前选择的视频接口
			movieApiList:[], // 所有视频接口
			movieCate:{}, // 电影小分类
			movieCateList:[
				{type: 0, name: '最新',list:[], icon: 'mdi-movie-filter-outline'},
				{type: 1, name: '电影',list:[], icon: 'mdi-movie-filter-outline'},
				{type: 2, name: '电视剧',list:[], icon: 'mdi-movie-roll'},
				{type: 2, name: '综艺',list:[], icon: 'mdi-star'},
				{type: 4, name: '动漫',list:[], icon: 'mdi-check-circle'},
			],
		}
	},
	actions:{
		/**
		 * 电影分类
		 *  需要对电影进行处理
		 */
		setMovieCateList(data){
			this.movieCateList[0].list = data.movie;
			this.movieCateList[1].list = data.tv_play;
			this.movieCateList[2].list = data.variety;
			this.movieCateList[3].list = data.cartoon;
		},

		/**
		 * 设置接口数据源
		 */
		setMovieApi(data){
			this.movieApi = data;
			LocalStorage.set(EnumData.movieApiLabel,data);
		},

		/**
		 * 设置接口数据源列表
		 */
		setMovieApiList(data){
			LocalStorage.set(EnumData.movieApiListLabel,data);
			this.movieApiList = data;
		},
		getMovieApiList(){
			let that = this;
			movieApiList().then(res=>{
				if (res.code === 200){
					that.setMovieApiList(res.data)
				}
			});
		}
	}

})

export const useWebsiteStore = defineStore("websiteStore", {
	state: () => {
		return {
			website: {
				name: "聚合影视",
				url: "http://localhost"
			}
		}
	},
	actions:{
		getWebsite(){
			const that = this;
			website().then(res=>{
				let {code,data} = res.data;
				if (code === 200){
					that.website = data;
					LocalStorage.set(EnumData.websiteLabel,data)
				}
			});
		},
		loadWebsite(){
			const website = LocalStorage.get(EnumData.websiteLabel);
			if (website != null){
				this.website = website;
			}else{
				this.getWebsite();
			}
		}
	}
})
export const useVideoStore = defineStore("videoStore", {
	state: () => {
		return {
			videoApiList: [],
		}
	},
	actions:{
		getVideoApi(){
			const that = this;
			videoApiList().then(res=>{
				let {code,data} = res.data;
				if (code === 200){
					that.videoApiList = data;
					LocalStorage.set(EnumData.videoApiLabel,data)
				}
			});
		},
		setVideoApi(data){
			this.videoApiList = data;
			LocalStorage.set(EnumData.videoApiLabel,data)
		},
		loadVideoApi(refresh=false){
			const videoApi = LocalStorage.get(EnumData.videoApiLabel);
			if (videoApi != null){
				refresh ? this.getVideoApi():this.videoApi = videoApi;
			}else{
				this.getVideoApi();
			}
		}
	}
})
export const useSettingStore = defineStore("settingStore", {
	state: () => {
		return {
			setting: {
				pageStyle:1
			},
		}
	},
	actions:{
		setPageStyle(type){
			this.setting.pageStyle = type;
			LocalStorage.set(EnumData.settingLabel,this.setting)
		},
		loadSetting(){
			const setting = LocalStorage.get(EnumData.settingLabel);
			LocalStorage.set(setting != null ? LocalStorage.set(EnumData.settingLabel,this.setting):EnumData.settingLabel,EnumData.setting);
		}
	}
})
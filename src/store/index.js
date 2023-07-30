import {defineStore} from "pinia";
import router from "../router/index.js";
import LocalStorage from "../utils/LocalStorage.js";
import EnumData from "../utils/EnumData.js";
import {login, website} from "../api/index.js";

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
			movieApi:{},
			movieList:[],
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
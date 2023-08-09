import "./api/request.js";

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

// 路由
import router from "./router/index.js";

// 状态管理
import {createPinia} from "pinia";

// 消息弹窗
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
const options = {
	position: "bottom-center",
	timeout: 1500,
	closeOnClick: true,
	pauseOnFocusLoss: false,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: false,
	closeButton: "button",
	icon: true,
	rtl: false,
};

// Vuetify
import 'vuetify/styles'
// 加载图标样式
import "@mdi/font/css/materialdesignicons.css"
import vuetify from './plugins/vuetify'
import {useMovieStore, useSettingStore, useUserStore, useWebsiteStore} from "./store/index.js";
import LocalStorage from "./utils/LocalStorage.js";
import EnumData from "./utils/EnumData.js";

const app = createApp(App);

app.use(router)
.use(vuetify)
.use(createPinia())
.use(Toast,options)

const website = useWebsiteStore()
website.loadWebsite();

const movie = useMovieStore();
const movieApiList = LocalStorage.get(EnumData.movieApiListLabel);
const movieApi = LocalStorage.get(EnumData.movieApiLabel);
// 加载接口列表
if (movieApiList== null){
	movie.getMovieApiList();
}else{
	movie.setMovieApiList(movieApiList)
}
// 加载已经选择的列表
movie.setMovieApi(movieApi)

const userStore = useUserStore();
const user = LocalStorage.get(EnumData.userLabel);
if (user !== null){
	userStore.setUser(user);
}
const settingStore = useSettingStore();
settingStore.loadSetting();

app.mount('#app')

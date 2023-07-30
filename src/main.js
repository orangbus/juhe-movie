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
import {useWebsiteStore} from "./store/index.js";

// 图片放大


const app = createApp(App);

app.use(router)
.use(vuetify)
.use(createPinia())
.use(Toast,options)

const website = useWebsiteStore()
website.loadWebsite();

app.mount('#app')

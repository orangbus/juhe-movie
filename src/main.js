import "./api/request.js";

import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'


// 路由
import router from "./router/index.js";

// 状态管理

// 消息弹窗


// Vuetify
import 'vuetify/styles'
// 加载图标样式
import "@mdi/font/css/materialdesignicons.css"
import vuetify from './plugins/vuetify'

createApp(App)
		.use(router)
		.use(vuetify)
		.mount('#app')

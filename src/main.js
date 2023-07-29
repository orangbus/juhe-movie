import "./api/request.js";

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'


// 路由
import router from "./router/index.js";

// 状态管理
import {createPinia} from "pinia";

// 消息弹窗

// Vuetify
import 'vuetify/styles'
// 加载图标样式
import "@mdi/font/css/materialdesignicons.css"
import vuetify from './plugins/vuetify'
import {useWebsiteStore} from "./store/index.js";

const app = createApp(App);

app.use(router)
.use(vuetify)
.use(createPinia())

const website = useWebsiteStore()
website.loadWebsite();

app.mount('#app')

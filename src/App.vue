<script>
import { defineComponent } from "vue";
import LocalStorage from "./utils/LocalStorage.js";
import EnumData from "./utils/EnumData.js";

export default defineComponent({
    name: "App",
    computed:{
        cachedViews(){
            return this.$router.options.routes
                .filter((route) =>{
                    route.meta && route.meta.keepalive
                })
                .map((route)=>route.name)
        }
    },
    // 用户关闭窗口的时候执行
    beforeUnmount() {
        window.removeEventListener("beforeunload",this.clearCache);
    },
    methods:{
        clearCache(){
            LocalStorage.remove(EnumData.websiteLabel);
            LocalStorage.remove(EnumData.friendLabel);
        }
    }
})
</script>

<template>
    <router-view v-slot="{Component,route}">
        <keep-alive :include="cachedViews.includes(route.name)">
            <Component :is="Component"></Component>
        </keep-alive>
    </router-view>
</template>

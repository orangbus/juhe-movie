<script>
import { defineComponent } from "vue";


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

<!--<style scoped>-->
/* 滚动槽 */
//::-webkit-scrollbar {
//    width: 5px;
//    height: 6px;
//}
//::-webkit-scrollbar-track {
//    border-radius: 10px;
//    background: rgba(0,0,0,0.06);
//    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
//}
/*!* 滚动条滑块 *!*/
/*::-webkit-scrollbar-thumb {*/
/*    border-radius: 3px;*/
/*    background: rgba(0,0,0,0.12);*/
/*    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);*/
//}
<!--</style>-->

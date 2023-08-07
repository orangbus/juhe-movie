<script setup>

import {ref} from "vue";
import router from "../../router/index.js";
import {storeToRefs} from "pinia";
import {useUserStore} from "../../store/index.js";
const {user} = storeToRefs(useUserStore());

const props= defineProps(["drawer"])
const menuList = ref([
    {
        icon: "mdi-high-definition-box",
        name: "视频",
        path: "/video",
        is_vip: user.vip === 1,
    },
    {
        icon: "mdi-play-circle",
        name: "解析",
        path: "/jiexi",
        is_vip: false,
    },
    {
        icon: "mdi-format-list-text",
        name: "文章",
        path: "/article",
        is_vip: false,
    },
    // {
    //     icon: "mdi-format-list-text",
    //     name: "测试页面",
    //     path: "/template",
    //     is_vip: false,
    // }
]);

const toPage = (path="/")=>{
    router.push({
        path: path
    })
}
</script>

<template>
    <v-navigation-drawer
        v-model="props.drawer"
        location="left"
        temporary
    >
        <v-list
            density="compact"
            nav
        >
            <v-list-item
                :prepend-icon="item.icon"
                :title="item.name"
                :value="item.name"
                v-for="(item,index) in menuList"
                :key="index"
                @click="toPage(item.path)"
                v-show="!item.is_vip"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">

</style>
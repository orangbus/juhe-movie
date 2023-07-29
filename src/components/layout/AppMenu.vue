<script setup>

import {ref} from "vue";
import router from "../../router/index.js";

const props= defineProps(["drawer"])
const menuList = ref([
    {
        id:1,
        icon: "mdi-view-dashboard",
        name: "首页",
        path: "/"
    },
    {
        id:2,
        icon: "mdi-view-dashboard",
        name: "个人中心",
        path: "/user"
    },
    {
        id:3,
        icon: "mdi-view-dashboard",
        name: "文章",
        path: "/article"
    }
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
                :value="item.id"
                v-for="(item,index) in menuList"
                :key="index"
                @click="toPage(item.path)"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">

</style>
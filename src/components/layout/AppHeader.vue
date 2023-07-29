<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import AppMenu from "./AppMenu.vue";
import {useWebsiteStore} from "../../store/index.js";

const website = useWebsiteStore();

const drawer = ref(false);
const model = ref(0);
const navList = ref([
    {id: 1,name: "最新"},
    {id: 2,name: "电影"},
    {id: 3,name: "电视剧"},
    {id: 4,name: "综艺"},
    {id: 4,name: "动漫"},
]);

const toPage = (path="/")=>{
    router.push({
        path: path
    })
}



</script>

<template>
    <!--头部导航-->
    <v-app-bar
        color="primary"
        image="https://picsum.photos/1920/1080?random"
    >
        <template v-slot:image>
            <v-img
                gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
        </template>

        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="cursor-pointer" @click="toPage">{{ website.name }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="toPage('/search')">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
            <v-tabs
                v-model="model"
            >
                <v-tab
                    v-for="(item,index) in navList"
                    :key="index"
                    :value="item.name"
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>
        </template>
    </v-app-bar>

    <!--左侧菜单-->
    <AppMenu :drawer="drawer"></AppMenu>
</template>

<style scoped lang="scss">

</style>
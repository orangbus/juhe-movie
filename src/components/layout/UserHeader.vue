<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import {useUserStore, useWebsiteStore} from "../../store/index.js";
import AppMenu from "./AppMenu.vue";

const userStore = useUserStore();
const website = useWebsiteStore();

const drawer = ref(false);
const model = ref(0);
const navList = ref([
    {id: 1,name: "个人中心"},
    {id: 2,name: "我的收藏"},
    {id: 3,name: "历史记录"},
    {id: 4,name: "邀请用户"},
]);

const toPage = (path="/")=>{
    router.push({path})
}

const logout = ()=>{
    userStore.userLogOut();
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


        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
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
    <app-menu :drawer="drawer"></app-menu>
</template>

<style scoped lang="scss">

</style>
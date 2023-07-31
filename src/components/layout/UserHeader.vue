<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import {useUserStore, useWebsiteStore} from "../../store/index.js";
import AppMenu from "./AppMenu.vue";
import {storeToRefs} from "pinia";

const userStore  = useUserStore();
const {user} = storeToRefs(userStore);
const {website} = storeToRefs(useWebsiteStore());

const drawer = ref(false);
const tab = ref(1); // 根据 id 定位选中什么
const tabs = ref([
    {id: 1,name: "个人中心"},
    {id: 2,name: "我的收藏"},
    {id: 3,name: "历史记录"},
    {id: 4,name: "邀请用户"},
    {id: 5,name: "设置"},
]);

const props = defineProps(["tab"]);
tab.value = props.tab;

const emit = defineEmits(["changeTab"]);
const changeTab = (item,index)=>{
    emit("changeTab",item,index);
}

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
        <v-app-bar-title class="cursor-pointer" @click="toPage()">{{ website.name }}</v-app-bar-title>


        <v-tooltip text="聚合搜索">
            <template v-slot:activator="{ props }">
                <v-btn icon @click="logout" v-bind="props">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-tooltip text="激活码">
            <template v-slot:activator="{ props }">
                <v-btn icon @click="logout" v-bind="props">
                    <v-icon>mdi-ticket-percent-outline</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
        <v-tooltip text="退出登录">
            <template v-slot:activator="{ props }">
                <v-btn icon @click="logout" v-bind="props">
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <template v-slot:extension>
            <v-tabs
                align-tabs="title"
                v-model="tab"
            >
                <v-tab
                    v-for="(item,index) in tabs"
                    :key="index"
                    :value="item.id"
                    @click="changeTab(item,index)"
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
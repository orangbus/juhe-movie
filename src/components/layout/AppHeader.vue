<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import AppMenu from "./AppMenu.vue";
import {useMovieStore, useWebsiteStore} from "../../store/index.js";
import {storeToRefs} from "pinia";
import MovieApiBtn from "./MovieApiBtn.vue";
const {website} = storeToRefs(useWebsiteStore());
const {movieCateList} = storeToRefs(useMovieStore());

const drawer = ref(false);
const model = ref(0);

// 切换头部tab
const emit = defineEmits(["changeTab","changeApi"])
const changeTab = (item,index)=>{
        emit("changeTab",item,index);
}
const changeApi = ()=>{
    model.value = 0; // 顶部选项卡重置
    emit("changeApi");
}

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
        <v-app-bar-title class="cursor-pointer" @click="toPage()">{{ website.name }}</v-app-bar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="toPage('/search')">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <MovieApiBtn @changeApi="changeApi"></MovieApiBtn>
        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>

        <template v-slot:extension>
            <v-tabs
                v-model="model"
                align-tabs="title"
            >
                <v-tab
                    v-for="(item,index) in movieCateList"
                    :key="index"
                    :value="item.name"
                    @click="changeTab(item,index)"
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
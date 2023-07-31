<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import AppMenu from "./AppMenu.vue";
import {useMovieStore, useUserStore, useWebsiteStore} from "../../store/index.js";
import {storeToRefs} from "pinia";
import MovieApiBtn from "./MovieApiBtn.vue";
const {website} = storeToRefs(useWebsiteStore());

const show = ref(true);
const drawer = ref(false);
const model = ref(0);
const cateList = ref([
    {type:0,name:"免费"},
    {type:1,name:"vip"},
])

const {user}  = storeToRefs(useUserStore());

const props = defineProps(["show"]);
if (props.show !== undefined){
    show.value = props.show;
}

// 切换头部tab
const emit = defineEmits(["changeTab"])
const changeTab = (item,index)=>{
        emit("changeTab",item,index);
}
const toPage = (path="/")=>{
    router.push({
        path: path
    })
}
</script>

<template>
    <!--头部导航 -->
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

        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension v-if="show">
            <div class="d-flex justify-center align-center">
                <v-tabs
                    v-model="model"
                    align-tabs="title"
                >
                    <v-tab
                        v-for="(item,index) in cateList"
                        :key="index"
                        :value="item.name"
                        @click="changeTab(item,index)"
                    >
                        {{ item.name }}
                    </v-tab>
                </v-tabs>
            </div>
        </template>
    </v-app-bar>

    <!--左侧菜单-->
    <AppMenu :drawer="drawer"></AppMenu>
</template>

<style scoped lang="scss">

</style>
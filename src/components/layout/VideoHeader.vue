<script setup>
import {ref} from "vue";
import router from "../../router/index.js";
import AppMenu from "./AppMenu.vue";
import {useVideoStore, useWebsiteStore} from "../../store/index.js";
import {storeToRefs} from "pinia";
const {website} = storeToRefs(useWebsiteStore());

const drawer = ref(false);
const model = ref(0);
const videoStore = useVideoStore();
const {videoApiList} = storeToRefs(videoStore);

const show = ref(true)
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
    <!--头部导航-->
    <v-app-bar
        color="primary"
        image="https://picsum.photos/1920/1080?random"
    >
        <template v-slot:image>
            <v-img
                gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
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

        <v-btn icon @click="toPage('/user')">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>

        <template v-slot:extension v-if="show">
            <v-tabs
                v-model="model"
                align-tabs="title"
            >
                <v-tab
                    v-for="(item,index) in videoApiList"
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
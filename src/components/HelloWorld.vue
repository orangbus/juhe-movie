<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../mock/mock.js"
import EnumData from "../Utils/EnumData.js";

const list = ref([]);
const postHeight = ref(250); // 封面图高度 350 250
const links = ref([
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
]);
const drawer = ref(false);
const items =ref(mock.menuList);
const loading = ref(true);

const showTop = ref(false);

const getData = () => {
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
        loading.value = false;
    },1500)
}

const onScroll = (e)=>{
    let container = e.target;

    // 显示到顶部
    showTop.value = container.scrollTop > container.clientHeight;

    if (container.clientHeight + container.scrollTop +100 >= container.scrollHeight && !loading.value){
        loading.value = true;
        getData();
    }
}

onMounted(()=>{
    getData();
})

// 监听宽度变化
const onResize = ()=>{
   // console.log(window.innerWidth)
}
// 回到顶部
const toTop = ()=>{
    document.body.scrollTop = 0;
    document.getElementById("backTop").scrollTop = -100;
}

</script>

<template>
    <v-card  class="mx-auto primary xyScrollBar" id="backTop"   @scroll="onScroll" v-resize="onResize">
        <v-layout>
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

                <v-app-bar-title>聚合影视</v-app-bar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                location="left"
                temporary
            >
                <v-list
                    density="compact"
                    nav
                >
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"
                    v-for="(item,index) in 20" :key="index"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main class="mt-3" id="backTop">
                <v-container >
                    <v-row dense  fluid >
                        <v-col
                            v-bind="EnumData.movieGrid"
                            v-for="(item,index) in list"
                            :key="index"
                            cols="6"
                        >
                            <v-card v-ripple>
                                <v-img :src="item.vod_pic"  :height="`${postHeight}px`" cover ></v-img>
                                <v-card-text>
                                    <div class="movie-title">{{ item.vod_name}}</div>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            {{ item.vod_remarks }}
                                        </div>
                                        <div>
                                            {{ item.updated_at.substring(0,10) }}
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" class="text-center" v-show="loading">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                        </v-col>
                    </v-row>

                </v-container>

                <v-footer class="bg-pink text-black">
                    <v-row justify="center" no-gutters>
                        <v-btn
                            v-for="link in links"
                            :key="link"
                            color="white"
                            variant="text "
                            class="mx-2 text-black"
                            rounded="xl"
                        >
                            {{ link }}
                        </v-btn>
                        <v-col class="text-center mt-4" cols="12">
                            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                        </v-col>
                    </v-row>
                </v-footer>


            </v-main>
        </v-layout>
    </v-card>
    <!--到顶部 -->
    <v-btn
        v-if="showTop"
        class="mx-3"
        :bottom="true"
        color="primary"
        @click="toTop"
        style="position: absolute;bottom: 60px;right: 30px;width: 50px;height: 60px;border-radius: 50%"
    >
        <v-icon>
            mdi-format-vertical-align-top
        </v-icon>
    </v-btn>
</template>
<style lang="scss" scoped>
.xyScrollBar {
    overflow: scroll;
    scroll-behavior: smooth;
    overscroll-behavior: none;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
}
.movie-title{
    padding-bottom: 10px;
}
</style>
<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import AppHeader from "../layout/AppHeader.vue";
import QrcodeVue from "qrcode.vue";
import {storeToRefs} from "pinia";
import {useWebsiteStore} from "../../store/index.js";
const {website} = storeToRefs(useWebsiteStore());

const page = ref(1); // 分页
const list = ref([]);
const loading = ref(true);
const showTop = ref(false);

const getData = () => {
    loading.value = true;
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
        console.log("page:",page.value)
        loading.value = false;
    },1500)
}

const container = ref(null);
onMounted(()=>{
    getData();

    window.addEventListener("scroll",handleScroll);
})
const handleScroll = ()=> {
    // 获取滚动位置
    const scrollTop =container.value.scrollTop;
    // 获取可视区域高度
    const clientHeight = container.value.clientHeight;
    // 获取页面内容的高度
    const scrollHeight = container.value.scrollHeight;

    // 判断是否滚动到页面底部（偏移值设为 50px）
    if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading.value) {
        page.value +=1;
        getData();
    }
}



// 回到顶部
const toTop = ()=>{
    // container.value.scrollTop = 0;
    document.getElementById("backTop").scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const show = ref(true);

</script>

<template>
        <v-card  class="mx-auto content-color " >
            <v-layout>
                <v-app>

                <AppHeader></AppHeader>
                <v-main scrollable="true">
                    <div class="container" id="backTop" ref="container" @scroll="handleScroll">
                        <!--视频列表-->
                        <v-container>
                            <v-row>
                                <v-col cols="2" v-for="(item,index) in list" :key="index">
                                    <v-card>
                                        <v-img :src="item.vod_pic"></v-img>
                                        <v-card-title>
                                            {{ item.vod_name}}
                                        </v-card-title>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <!--加载动画-->
                            <v-col cols="12" class="text-center" v-show="loading">
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                            </v-col>
                        </v-container>

                        <Footer></Footer>

                        <!--到顶部 v-if="showTop" -->
                        <v-btn
                            class="mx-3"
                            :bottom="true"
                            color="primary"
                            @click="toTop"
                            style="position: absolute;bottom: 60px;right: 30px;width: 50px;height: 60px;border-radius: 50%"
                        >
                            <v-icon size="25">
                                mdi-format-vertical-align-top
                            </v-icon>
                        </v-btn>
                    </div>
                </v-main>
                </v-app>

            </v-layout>
        </v-card>
</template>
<style lang="scss" scoped>
.container {
    height: 100%; /* Ensure the container takes full height of v-main */
    overflow-y: auto;
}
</style>
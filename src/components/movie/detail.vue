<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import DetailHeader from "../layout/DetailHeader.vue";
import router from "../../router/index.js";

const id = ref(0);
const list = ref([]);
const movie = ref({
    "id": 3867568,
    "api_id": 91,
    "status": 1,
    "vod_id": 68105,
    "vod_name": "幸福初级班",
    "type_id": 14,
    "vod_tag": "剧情,喜剧,爱情",
    "type_name": "剧情片",
    "vod_pic": "https://hhmage.com/cover/702c7c3c2936d1b5a651c1cd184b2e7f.jpg",
    "vod_area": "美国",
    "vod_lang": "英语",
    "vod_year": "2023",
    "vod_actor": "卢克·葛莱姆斯,艾丽·坎伯尔,尼科·桑托斯",
    "vod_director": "Vicky Wight",
    "vod_remarks": "正片",
    "vod_content": "Helen signs up for a wilderness survival course, a year after getting divorced. She discovers through this experience that sometimes, you have to get really lost in order to find yourself.",
    "vod_play_from": "'hhyun$$$hhm3u8'",
    "vod_play_note": "$$$",
    "vod_play_url": "'正片$https://bf.hhuus.com/play/nelP7X6e$$$正片$https://bf.hhuus.com/play/nelP7X6e/index.m3u8'",
    "vod_down_note": "",
    "vod_down_url": "",
    "vod_hits": 565,
    "vod_hits_day": 642,
    "vod_hits_week": 32,
    "vod_hits_month": 194,
    "created_at": "2023-07-28 20:04:15",
    "updated_at": "2023-07-28 20:04:15"
},)
const height = ref("700px"); //  700px
const movieHeight = ref("300px"); //  700px

const getData = () => {
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
    },1500)
}

onMounted(()=>{
    id.value = router.currentRoute.value.params.id;
    getData();
})

</script>

<template>
    <v-card  class="mx-auto primary " id="backTop" color="#ccc">
        <v-layout>
            <DetailHeader></DetailHeader>
            <v-main  id="backTop">
                <!--视频列表-->
                <v-container  class="container px-1 py-2">
                    <v-row>
                        <v-col
                            class=" p-0"
                            cols="12" sm="12" xs="12" md="12" lg="9">
                            <iframe
                                class="movie-player mobile"
                                src="https://www.xinlangjiexi.com/m3u8/?url=https://asp-bo3.mangguozy-videos.com:5278/20230604/vfiWJczh/index.m3u8"
                                allowfullscreen
                            ></iframe>
                        </v-col>
                        <v-col cols="12" class="p-0" sm="12" xs="12" md="12" lg="3">
                            <!--<v-card height="700px" :style="`background-image: url('${movie.vod_pic}');background-size: cover;background-position: center；position: relative`">-->
                            <v-card :height="height" >
                                <v-card-text>
                                    <div class="d-flex justify-space-between align-center">
                                        <div>
                                            <v-card-title class="px-0">{{movie.vod_name}}</v-card-title>
                                        </div>
                                        <div>
                                            <v-icon size="30">mdi-hand-heart</v-icon>
                                            <v-icon size="30">mdi-dots-vertical</v-icon>
                                        </div>
                                    </div>
                                    <div class="font-weight-light">{{ movie.vod_remarks }} | {{ movie.vod_year }} | {{ movie.vod_tag}}</div>
                                    <div class="font-weight-light">{{ movie.vod_actor }}</div>
                                    <div class="font-weight-light">{{ movie.vod_content }}</div>
                                    <div class="mt-3">
                                        <div>
                                            <v-btn-group>
                                                <v-btn color="primary" class="mb-1" v-for="(item,index) in 5" :key="index">1-30</v-btn>
                                            </v-btn-group>
                                        </div>
                                        <div style="display: flex;justify-content: space-between;flex-wrap: wrap;height: 100px;">
                                            <v-btn color="primary" class="mb-1"
                                                   style="overflow: hidden;"
                                                   v-for="(item,index) in 30" :key="index" >{{ index +1}}</v-btn>
                                            <v-btn color="info" block >展开</v-btn>

                                        </div>
                                    </div>
                                </v-card-text>

                            </v-card>
                            <div></div>
                        </v-col>
                    </v-row>

                    <MovieList :list="list"></MovieList>
                    <!--加载动画-->
                    <v-col cols="12" class="text-center" v-show="loading">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </v-col>
                </v-container>

                <Footer></Footer>
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
.container{
    padding: 0px;
}

</style>
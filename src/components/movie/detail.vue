<script setup>
import {ref, onMounted} from "vue"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import DetailHeader from "../layout/DetailHeader.vue";
import router from "../../router/index.js";
import {movieCollectStore, movieDetail} from "../../api/movie.js";
import MovieUtil from "../../utils/MovieUtil.js";
import snackbar from "../../utils/snackbar.js";

const id = ref(0);
const list = ref([]);
const movie = ref({})
const height = ref("700px"); //  700px
const preParseUrl = ref("https://www.gszyv.com/m3u8/?url="); // 当前视频对应的解析接口
const playerUrl = ref(""); // 当前播放的url地址
const movieUrlList = ref([]); // 播放分类
const movieUrls = ref([]); // 播放分类下面的播放url

const cateIndex = ref(0); // 分类索引
const urlIndex = ref(0); // 播放索引

const getData = () => {
    movieDetail(id.value).then(res => {
        if (res.code === 200) {
            let {info, api} = res.data;
            if (api != null) {
                preParseUrl.value = api.parse_url;
            }
            movie.value = info;
            list.value = res.data.list;

            // 解析地址
            movieUrlList.value = MovieUtil.transformUrl(movie.value)
            movieUrls.value = movieUrlList.value[cateIndex.value].list;

            // 提取第一个播放地址
            movieUrls.value[0].selected = true; // 设置第一个播放地址选中

            // 开始播放
            startPlay(movieUrls.value[0].url);
        }
    });
}

// 切换分类
const changeCate = (item,index)=>{
    cateIndex.value = index;
    // 切换播放列表
    movieUrls.value = movieUrlList.value[index].list;
    movieUrls.value[urlIndex.value].selected = true;
    // 获取当前播放
    startPlay(movieUrls.value[urlIndex.value].url)
}

// 切换播放
const changeUrl = (item,index)=>{
    urlIndex.value = index;
    movieUrls.value.forEach(item=>{
        item.selected = false;
    })
    movieUrls.value[index].selected = true;
    startPlay(item.url);
}

const startPlay = (url="")=>{
    if (url === ""){
        snackbar.error("播放地址错误")
    }
    // m3u8 格式的
    if (url.includes("m3u8")){
        playerUrl.value = preParseUrl.value + url;
    }else{
        playerUrl.value = url;
    }
    console.log( playerUrl.value)
}

onMounted(() => {
    id.value = router.currentRoute.value.params.id;
    getData();
})

const backUp = ()=>{
    router.push({path:"/"})
    // window.history.back();
}
const collect = (item)=>{
    movieCollectStore({
        id: movie.value.id,
        api_id: movie.value.api_id
    }).then(res=>{
        if (res.code === 200){
            snackbar.success(res.msg)
            if (movie.value.collect == null){
                movie.value.collect = {};
            }else{
                movie.value.collect = null;
            }
        }else{
            snackbar.error(res.msg)
        }
    })
}

</script>

<template>
    <v-card class="mx-auto primary " id="backTop" color="#ccc">
        <v-layout>
            <DetailHeader></DetailHeader>
            <v-main id="backTop">
                <!--视频列表-->
                <v-container class="container px-1 py-2">
                    <v-row>
                        <v-col
                            class=" p-0"
                            cols="12" sm="12" xs="12" md="12" lg="9">
                            <iframe
                                v-if="playerUrl"
                                class="movie-player mobile"
                                :src="playerUrl"
                                allowfullscreen
                            ></iframe>
                        </v-col>
                        <v-col cols="12" class="p-0" sm="12" xs="12" md="12" lg="3" >
                            <!--<v-card height="700px" :style="`background-image: url('${movie.vod_pic}');background-size: cover;background-position: center；position: relative`">-->
                            <v-card :height="height" style="background-color: #f5f5f5">
                                <v-card-text>
                                    <div class="d-flex justify-space-between align-center">
                                        <div>
                                            <v-card-title class="px-0 text-one-line">{{ movie.vod_name }}</v-card-title>
                                        </div>
                                        <div>
                                            <v-icon size="30" @click="collect()" :color="movie.collect !== null ? 'red':''">{{ movie.collect == null ? 'mdi-heart-outline':'mdi-heart'}}</v-icon>
                                        </div>
                                    </div>
                                    <div class="font-weight-light">{{ movie.vod_remarks }} | {{ movie.vod_year }} |
                                        {{ movie.vod_tag }}
                                    </div>
                                    <div class="font-weight-light">{{ movie.vod_actor }}</div>
                                    <div class="font-weight-light text-five-line" v-html="movie.vod_content"></div>
                                    <div class="mt-3">
                                        <div>
                                            <div class="d-flex justify-space-between align-center">
                                                <v-tabs
                                                    class="mb-1"
                                                    v-model="cateIndex"
                                                >
                                                    <v-tab
                                                        v-for="(item,index) in movieUrlList"
                                                        :key="index"
                                                        :value="index"
                                                        @click="changeCate(item,index)"
                                                    >
                                                        {{ item.name }}
                                                    </v-tab>
                                                </v-tabs>
                                                <div @click="backUp">
                                                    <v-btn color="info">返回</v-btn>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="url">
                                            <v-btn
                                                v-for="(item,index) in movieUrls" :key="index"
                                                :color="item.selected ? 'primary':''"
                                                class="mb-1 mr-1"
                                                @click="changeUrl(item,index)"
                                            >{{ item.name }}
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <div></div>
                        </v-col>
                    </v-row>
                    <MovieList :list="list"></MovieList>
                </v-container>
                <Footer></Footer>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.container {
    padding: 0px;
}
.url{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: scroll;
}

</style>
<script setup>
import {ref, onMounted, onActivated} from "vue"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import DetailHeader from "../layout/DetailHeader.vue";
import router from "../../router/index.js";
import {movieCollectStore, movieDetail, movieToday} from "../../api/movie.js";
import MovieUtil from "../../utils/MovieUtil.js";
import snackbar from "../../utils/snackbar.js";
import {storeToRefs} from "pinia";
import {useMovieStore} from "../../store/index.js";
import MovieDownload from "../common/MovieDownload.vue";

const id = ref(0);
const loading = ref(true);
const list = ref([]);
const movie = ref({})
const height = ref("700px"); //  700px
const preParseUrl = ref("https://www.gszyv.com/m3u8/?url="); // 当前视频对应的解析接口
const playerUrl = ref(""); // 当前播放的url地址
const movieUrlList = ref([]); // 播放分类
const movieUrls = ref([]); // 播放分类下面的播放url
const downloadList = ref([]); // 下载链接

const cateIndex = ref(0); // 分类索引
const urlIndex = ref(0); // 播放索引

const apiInfo = ref({});
const movieStore = useMovieStore();


const getData = () => {
    loading.value = true;
    movieDetail(id.value).then(res => {
        loading.value = false;
        if (res.code === 200) {
            let {info, api} = res.data;
            if (api != null) {
                preParseUrl.value = api.parse_url;
            }
            movie.value = info;
            apiInfo.value = api;
            initPlayerInfo(movie.value);

            setTimeout(function () {
                list.value = res.data.list;
            },1000)
        }
    });
}
// 初始化播放信息
const initPlayerInfo = (movieInfo)=>{
    movie.value = movieInfo;
    // 解析地址
    movieUrlList.value = MovieUtil.transformUrl(movieInfo)
    movieUrls.value = movieUrlList.value[cateIndex.value].list;

    // 提取第一个播放地址
    movieUrls.value[0].selected = true; // 设置第一个播放地址选中
    // 开始播放
    startPlay(movieUrls.value[0].url);

    // 设置下载链接
    movieUrlList.value.forEach(item=>{
        if (item.name.includes("m3u8")){
            downloadList.value = item.list;
        }
    })
    toTop();
}

const player = (item)=>{
    initPlayerInfo(item)
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
        return false;
    }
    // m3u8 格式的
    if (url.includes("m3u8")){
        playerUrl.value = preParseUrl.value + url;
    }else{
        playerUrl.value = url;
    }
}

// onMounted(() => {
//     id.value = router.currentRoute.value.params.id;
//     getData();
// })
onActivated(()=>{
    id.value = router.currentRoute.value.params.id;
    getData();
})


const backUp = ()=>{
    window.history.back(-1);
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
const addMy = ()=>{
        movieToday({id:movie.value.id}).then(res=>{
            if (res.code === 200){
                snackbar.success(res.msg);
            }else{
                snackbar.error(res.msg);
            }
        });
}

// 设置默认源
const setDefault=()=>{
    if (apiInfo.value != null){
        movieStore.setMovieApi(apiInfo.value);
        snackbar.success("设置成功，可能需要刷新浏览器生效");
    }else{
        snackbar.warning("当前接口已过期或者不存在");
    }
}
const toTop = ()=>{
    document.body.scrollTop = 0;
    document.getElementById("backTop").scrollTop = 0;
}
</script>

<template>
    <v-card class="mx-auto primary " id="backTop" color="#ccc">
        <v-layout>
            <DetailHeader></DetailHeader>
            <v-main>
                <!--加载动画-->
                <v-dialog
                    v-model="loading"
                    :scrim="false"
                    persistent
                    width="auto"
                >
                    <v-card
                        color="primary"
                    >
                        <v-card-text>
                           加载中，请稍后。。。
                            <v-progress-linear
                                indeterminate
                                color="white"
                                class="mb-0"
                            ></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!--视频列表-->
                <v-container v-if="!loading" class="container px-1 py-2">
                    <v-row>
                        <v-col
                            class=" p-0"
                            cols="12" sm="12" xs="12" md="12" lg="9">
                            <iframe
                                v-if="playerUrl !== '' && !loading"
                                class="movie-player mobile"
                                :src="playerUrl"
                                allowfullscreen
                            ></iframe>
                        </v-col>
                        <v-col cols="12" class="p-0" sm="12" xs="12" md="12" lg="3" >
                            <v-card :height="height" style="background-color: #f5f5f5">
                                <v-card-text>
                                    <v-card-title class="px-0 text-one-line">{{ movie.vod_name }}</v-card-title>
                                    <div class="font-weight-light">{{ movie.vod_remarks }} | {{ movie.vod_year }} |
                                        {{ movie.vod_tag }}
                                    </div>
                                    <div class="font-weight-light">{{ movie.vod_actor }}</div>
                                    <div class="font-weight-light text-five-line" v-html="movie.vod_content"></div>
                                    <div class="d-flex justify-space-between mt-3">
                                        <v-tooltip text="收藏" location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-icon
                                                    v-bind="props"
                                                    size="35"
                                                    @click="collect()" :color="movie.collect !== null ? 'red':''">{{ movie.collect == null ? 'mdi-heart-outline':'mdi-heart'}}</v-icon>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip text="加入追更" location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-icon size="35" class="ml-2 cursor-pointer" v-bind="props" @click="addMy">mdi-playlist-check</v-icon>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip text="设置默认数据源" location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-icon
                                                    v-bind="props"
                                                    size="35"
                                                    @click="setDefault()" >mdi-cog-refresh</v-icon>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip text="下载" location="top">
                                            <template v-slot:activator="{ props }">
                                                <MovieDownload v-bind="props" :movie="movie" :downloadList="downloadList"/>
                                            </template>
                                        </v-tooltip>
                                    </div>
                                    <v-divider class="mt-3" />
                                    <div>
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
                                                    <v-btn v-bind="props">
                                                        <v-icon>mdi-arrow-left</v-icon>
                                                    </v-btn>
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
                    <MovieList v-if="list.length > 0" :list="list" :detail="true" @player="player"></MovieList>
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
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
const height = ref("500px"); //  700px
const preParseUrl = ref("https://www.gszyv.com/m3u8/?url="); // 当前视频对应的解析接口
const playerUrl = ref(""); // 当前播放的url地址
const movieUrlList = ref([]); // 播放分类
const movieUrls = ref([]); // 播放分类下面的播放url
const downloadList = ref([]); // 下载链接

const cateIndex = ref(0); // 分类索引
const urlIndex = ref(0); // 播放索引

const apiInfo = ref({});
const movieStore = useMovieStore();
const {movieApi} = storeToRefs(movieStore);

const props = defineProps(["movie"]);
preParseUrl.value = movieApi.value.parse_url;
apiInfo.value = movieApi.value;

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
// 初始化播放信息
const initPlayerInfo = (movieInfo)=>{
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
}
initPlayerInfo(props.movie);


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
    <!--视频列表-->
    <v-container class="container">
        <v-row>
            <v-col
                style="padding: 0px"
                cols="12" sm="12" xs="12" md="12" lg="12">
                <iframe
                    v-if="playerUrl !== ''"
                    class="movie-player mobile"
                    :src="playerUrl"
                    allowfullscreen
                ></iframe>
            </v-col>
            <v-col cols="12"  sm="12" xs="12" md="12" lg="12" style="padding: 0px">
                <v-card :height="height" style="background-color: #f5f5f5">
                    <v-card-text>
                        <v-card-title class="px-0 text-one-line">{{ movie.vod_name }}</v-card-title>
                        <div class="font-weight-light">
                            <span v-if="movie.vod_remarks != ''">{{ movie.vod_remarks }} | </span>
                            <span v-if="movie.vod_year != ''">{{ movie.vod_year }} | </span>
                            <span v-if="movie.vod_tag != ''">{{ movie.vod_tag }} </span>
                        </div>
                        <div class="font-weight-light">{{ movie.vod_actor }}</div>
                        <div class="font-weight-light text-five-line" v-html="movie.vod_content"></div>
                        <v-divider class="mt-3" />
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
                                            <v-icon size="35" class="ml-3 cursor-pointer" v-bind="props" @click="addMy">mdi-playlist-check</v-icon>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip text="设置默认数据源" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-icon
                                                class="ml-3"
                                                v-bind="props"
                                                size="35"
                                                @click="setDefault()" >mdi-cog-refresh</v-icon>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip text="下载" location="top">
                                        <template v-slot:activator="{ props }">
                                            <MovieDownload class="ml-3" v-bind="props" :movie="movie" :downloadList="downloadList"/>
                                        </template>
                                    </v-tooltip>
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
    </v-container>
</template>
<style lang="scss" scoped>
.container {
    padding: 0px;
}
.url{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    overflow-y: scroll;
}

</style>
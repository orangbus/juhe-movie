<script setup>
import VideoHeader from "../layout/VideoHeader.vue";
import {onActivated, ref} from "vue";
import Footer from "../layout/Footer.vue";
import { videoDetail} from "../../api/video.js";
import {useVideoStore} from "../../store/index.js";
import VideoDataList from "../layout/VideoDataList.vue";
import router from "../../router/index.js";

const loading = ref(true);
const id = ref(0); // 视频对象
const video = ref({}); // 视频对象
const list = ref([]); // 视频推荐列表
const videoStore = useVideoStore();

const height = ref("700px"); //  700px
const preParseUrl = ref("https://www.gszyv.com/m3u8/?url="); // 当前视频对应的解析接口
const playerUrl = ref(""); // 当前播放的url地址


const getData = () => {
    loading.value = true;
    videoDetail({
        id: id.value,
    }).then(res => {
        loading.value = false;
        if (res.code === 200) {
            video.value = res.data.video;
            list.value = res.data.list;
            
            let item = video.value.vpath.split("$");
            let url = item.length == 1 ? item[0]: item[1];
            playerUrl.value = preParseUrl.value + url;
        }
    })
}
const search = () => {
    list.value = [];
    getData();
}

onActivated(()=>{
    id.value = router.currentRoute.value.params.id;
    getData();
})

// 切换视频
const changeVideo = (item)=>{
    id.value = item.id;
    search();
}

const backUp = ()=>{
    router.push({path:"/video"})
}

</script>

<template>
    <v-card class="mx-auto primary bg-color">
        <v-layout>
            <VideoHeader :show="false"></VideoHeader>
            <v-main class="mt-3" id="backTop">
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
                <v-container v-if="!loading">
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
                            <v-card :height="height" style="background-color: #f5f5f5">
                                <v-card-text>
                                    <div class="d-flex justify-space-between align-center">
                                        <div>
                                            <v-card-title class="px-0 ">{{ video.vod_title }}</v-card-title>
                                        </div>
                                    </div>
                                    <div class="font-weight-light">
                                        <span>{{ video.category }}</span>
                                        <span v-show="video.vod_year != ''">| {{ video.vod_year }}</span>
                                        <span v-show="video.vod_area != ''">| {{ video.vod_area }}</span>
                                    </div>
                                    <div class="font-weight-light">{{ video.vod_actor }}</div>
                                    <div class="font-weight-light text-five-line" v-html="video.vod_content"></div>
                                    <div class="mt-3">
                                        <div @click="backUp">
                                            <v-tooltip text="返回列表">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn v-bind="props">
                                                        <v-icon>mdi-arrow-left</v-icon>
                                                    </v-btn>
                                                </template>
                                            </v-tooltip>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <div></div>
                        </v-col>
                    </v-row>

                    <VideoDataList :list="list" :is_detail="true" @changeVideo="changeVideo"></VideoDataList>
                </v-container>
                <Footer></Footer>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped lang="scss">
.search-container {
    position: sticky;

    .search {
        position: relative;
        padding-left: 0;
        padding-right: 0;

        .search-input {
            width: 100%;
            height: 50px;
            background-color: white;
            opacity: 0.5;
            border: none;
            outline: none;
            padding: 10px 10px 10px 15px;
            border-radius: 5px;
        }

        .search-icon {
            position: absolute;
            right: 0;
            top: 0;
            background-color: red;
            width: 100px;
            height: 100%;
            color: white;
            border-radius: 0px 5px 5px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
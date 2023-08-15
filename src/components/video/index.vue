<script setup>
import VideoHeader from "../layout/VideoHeader.vue";
import {onActivated, onMounted, ref} from "vue";
import Footer from "../layout/Footer.vue";
import snackbar from "../../utils/snackbar.js";
import {videoApiList, videoList} from "../../api/video.js";
import {useVideoStore} from "../../store/index.js";
import VideoDataList from "../layout/VideoDataList.vue";

const page = ref(1);
const api_id = ref(0);
const cid = ref("");
const cateList = ref([]);
const keywords = ref("");
const loading = ref(true);
const list = ref([]);
const videoStore = useVideoStore();


const getData = () => {
    loading.value = true;
    videoList({
        page: page.value,
        api_id: api_id.value,
        cid: cid.value,
        keywords: keywords.value,
    }).then(res=>{
        loading.value = false;
        if (res.code === 200){
            list.value.push(...res.data);
        }
    })
}
const search = ()=>{
    if (keywords.value === ""){
        return false;
    }
    resetData();
}
const resetData = ()=>{
    page.value = 1;
    list.value = [];
    getData();
}

const container = ref(null);
const scrollTop = ref(0);
const clientHeight = ref(0);
const scrollHeight = ref(0);
onMounted(()=>{
    videoApiList().then(res=>{
        if (res.code === 200){
            let data = res.data;
            videoStore.setVideoApi(res.data);
            if (data.length > 0){
                api_id.value = data[0].id;
                cateList.value = data[0].cate;
                getData();
            }
        }else{
            snackbar.error(res.msg);
        }
    })
})

onActivated(() => {
    if (scrollTop.value > clientHeight.value) {
        document.getElementById("backTop").scrollTo({
            top: scrollTop.value,
        });
    }
})
const handleScroll = () => {
    // 获取滚动位置
    scrollTop.value = container.value.scrollTop;
    // 获取可视区域高度
    clientHeight.value = container.value.clientHeight;
    // 获取页面内容的高度
    scrollHeight.value = container.value.scrollHeight;
    showTop.value = scrollTop.value > clientHeight.value;

    // 判断是否滚动到页面底部（偏移值设为 50px）
    if (scrollHeight.value - (scrollTop.value + clientHeight.value) < 50 && !loading.value) {
        page.value += 1;
        getData();
    }
}

const changeTab = (item,index)=>{
        api_id.value = item.id;
        cid.value = 0;
        resetData();
}
const changeCate = (item)=>{
    cid.value = item.id;
    resetData();
}

// 回到顶部
const showTop = ref(false);
const toTop = ()=>{
    document.getElementById("backTop").scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

</script>

<template>
    <v-card  class="mx-auto primary bg-color">
        <v-layout>
            <v-app>
                <VideoHeader @changeTab="changeTab"></VideoHeader>
                <v-main scrollable="true">
                    <div class="main" id="backTop" ref="container" @scroll="handleScroll">
                        <!--视频列表-->
                        <v-container >
                            <!--分类-->
                            <v-row style="overflow-y: scroll;" v-if="cateList.length > 0">
                                <v-col cols="12" class="d-flex">
                            <span v-ripple class="mr-2 cursor-pointer " v-for="(item,index) in cateList" :key="index"
                                  @click="changeCate(item)">
                            <v-chip label
                                    :variant="cid === item.type_id ? 'outlined':''"
                                    color="primary">{{ item.name }}</v-chip>
                            </span>
                                </v-col>
                            </v-row>
                            <!--搜索-->
                            <v-col cols="12" class="px-0 search-container">
                                <div class="search">
                                    <input type="text" class="search-input" placeholder="请输入你的关键词，支持全文检索"
                                           v-model="keywords"
                                           @blur="search"
                                           @keydown.enter="search"/>
                                    <div class="search-icon cursor-pointer" @click="search">
                                        <v-icon size="32">mdi-magnify</v-icon>
                                    </div>
                                </div>
                            </v-col>
                            <VideoDataList :list="list"></VideoDataList>

                            <!--加载动画-->
                            <v-col cols="12" class="text-center" v-show="loading">
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                            </v-col>
                        </v-container>
                        <Footer></Footer>
                        <v-btn
                            v-if="showTop"
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
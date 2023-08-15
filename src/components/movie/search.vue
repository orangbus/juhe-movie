<script setup>
import {ref, onMounted, onActivated} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import SearchHeader from "../layout/SearchHeader.vue";
import {movieSearch} from "../../api/movie.js";
import snackbar from "../../utils/snackbar.js";

const page = ref(1);
const total = ref(0);
const list = ref([]);
const loading = ref(true);
const tab = ref(0);
const keywords = ref("");

const container = ref(null);
const scrollTop = ref(0);
const clientHeight = ref(0);
const scrollHeight = ref(0);

const getData = () => {
    loading.value = true;
    movieSearch({
        page: page.value,
        vod_name: keywords.value,
        type: tab.value
    }).then(res => {
        loading.value = false;
        if (res.code === 200) {
            list.value.push(...res.data);
            total.value = res.total;
        } else {
            snackbar.error(res.msg);
        }
    });
}
const search = () => {
    page.value = 1;
    list.value = [];
    toTop();
    getData();
}
const submitSearch = () => {
    if (keywords.value == "") {
        return;
    }
    search();
}

onMounted(() => {
    getData();
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

const changeTab = (item) => {
    tab.value = item.type;
    search();
}
// 回到顶部
const showTop = ref(false);
const toTop = () => {
    document.getElementById("backTop").scrollTo({
        top: 100,
        behavior: "smooth"
    });
}
</script>

<template>
    <v-card class="mx-auto content-color">
        <v-layout>
            <v-app>
                <SearchHeader @changeTab="changeTab"></SearchHeader>
                <v-main :scrollable="true">
                    <div class="main" id="backTop" ref="container" @scroll="handleScroll">
                        <!--视频列表-->
                        <v-container>
                            <!--搜索-->
                            <v-col cols="12" class="px-0 search-container">
                                <div class="search">
                                    <input type="text" class="search-input" placeholder="请输入你的关键词，支持全文检索"
                                           v-model="keywords"
                                           @blur="submitSearch"
                                           @keydown.enter="submitSearch"/>
                                    <div class="search-icon cursor-pointer" @click="submitSearch">
                                        <v-icon size="32">mdi-magnify</v-icon>
                                    </div>
                                </div>
                            </v-col>

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
<style lang="scss" scoped>
</style>
<script setup>
import {ref, onMounted} from "vue"
import Footer from "../layout/Footer.vue";
import AppHeader from "../layout/AppHeader.vue";
import MovieList from "../layout/MovieList.vue";
import {freeMovieCate, freeMovieList} from "../../api/index.js";
import {useMovieStore, useUserStore} from "../../store/index.js";
import snackbar from "../../utils/snackbar.js";
import {storeToRefs} from "pinia";
import {movieCate, movieList} from "../../api/movie.js";

const page = ref(1); // 分页
const list = ref([]); // 视频列表
const keywords = ref(""); // 搜索关键词
const loading = ref(true);
const showTop = ref(false);

const movie = useMovieStore();
const {movieApi} = storeToRefs(movie);
const {auth} = storeToRefs(useUserStore());


// 获取分类
const getMovieCate = () => {
    // 用户的呢牢固，并且选择了其它接口
    let api =null;
    if (auth.value != null && movieApi.value != null) {
        api = movieCate({api_id:movieApi.value.id});
    }else{
        api = freeMovieCate();
    }
    api.then(res => {
        if (res.code === 200) {
            let data = res.data;
            if (data != null){
                movie.setMovieCateList(res.data);
            }
        }
    });
}
const getData = () => {
    loading.value = true;
    let param = {
        page: page.value,
        type: type.value,
        keywords: keywords.value,
        type_id: typeId.value
    };
    let api = null;
    if (auth.value != null && movieApi.value != null) {
        param.api_id = movieApi.value.id;
        api = movieList(param);
    }else{
        api = freeMovieList(param);
    }
    api.then(res => {
        loading.value = false;
        if (res.code === 200) {
            list.value.push(...res.data);
        } else {
            snackbar.error(res.msg);
        }
    });
}
const search = () => {
    page.value = 1;
    loading.value = true;
    list.value = [];
    toTop();
    getData()
}

onMounted(() => {
    getMovieCate();
    getData();
    // window.addEventListener("scroll", handleScroll);
})

const container = ref(null);
const handleScroll = () => {
    // 获取滚动位置
    const scrollTop =container.value.scrollTop;
    // 获取可视区域高度
    const clientHeight = container.value.clientHeight;
    // 获取页面内容的高度
    const scrollHeight = container.value.scrollHeight;
    if (scrollTop > clientHeight){
        showTop.value = true;
    }

    // 判断是否滚动到页面底部（偏移值设为 50px）
    if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading.value) {
        page.value +=1;
        getData();
    }
}
// 回到顶部
const toTop = () => {
    document.getElementById("backTop").scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const cateList = ref([]);
const type = ref(0);
const typeId = ref(0);
const changeTab = (item, index) => {
    type.value = item.type;
    cateList.value = item.list;
    typeId.value = 0;
    search();
}

const changeApi = () => {
    type.value = 0;
    cateList.value = [];
    typeId.value = 0;
    toTop();
    search();
    getMovieCate()
}
const changeCate = (item) => {
    typeId.value = item.type_id;
    // 重新搜索
    search();
}
</script>

<template>
    <v-card class="mx-auto content-color">
        <v-layout>
            <v-app>
                <AppHeader @changeTab="changeTab" @changeApi="changeApi"></AppHeader>
                <v-main scrollable="true">
                    <div class="main" id="backTop" ref="container" @scroll="handleScroll">
                        <v-container>
                            <!--分类-->
                            <v-row style="overflow-y: scroll" v-if="cateList.length > 0">
                                <v-col cols="12" class="d-flex">
                            <span v-ripple class="mr-2 cursor-pointer " v-for="(item,index) in cateList" :key="index"
                                  @click="changeCate(item)">
                            <v-chip label
                                    :variant="typeId === item.type_id ? 'outlined':''"
                                    color="primary">{{ item.type_name }}</v-chip>
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
                            <!--视频列表-->
                            <MovieList :list="list"></MovieList>
                            <!--加载动画-->
                            <v-col cols="12" class="text-center mt-3" v-show="loading">
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
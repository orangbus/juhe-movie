<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import SearchHeader from "../layout/SearchHeader.vue";

const page = ref(1); // 分页
const list = ref([]);
const loading = ref(true);
const tab = ref(0);
const keywords = ref("");

const getData = () => {
    loading.value = true;
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
        console.log("page:",page.value)
        loading.value = false;
    },1500)
}
const search = ()=>{
    page.value = 1;
    list.value = [];
    getData();
}
const submitSearch = ()=>{
    if (keywords.value == "") {
        return;
    }
    search();
}

onMounted(()=>{
    getData();
    window.addEventListener("scroll",handleScroll);
})
const handleScroll = ()=> {
    // 获取滚动位置
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 获取可视区域高度
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    // 获取页面内容的高度
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断是否滚动到页面底部（偏移值设为 50px）
    if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading.value) {
        page.value +=1;
        getData();
    }
}

const changeTab = (item)=>{
    tab.value = item.type;
    search();
}
// 回到顶部
const toTop = ()=>{
    document.body.scrollTop = 0;
    document.getElementById("backTop").scrollTop = -100;
}

</script>

<template>
    <v-card class="mx-auto primary body-color" id="backTop" >
        <v-layout>
            <SearchHeader @changeTab="changeTab"></SearchHeader>
            <v-main>
                <!--视频列表-->
                <v-container >
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
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.body-color{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 10%);
}
</style>
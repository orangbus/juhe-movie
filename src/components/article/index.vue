<script setup>
import {ref,onMounted} from "vue"
import Footer from "../layout/Footer.vue";
import ArticleHeader from "../layout/ArticleHeader.vue";
import router from "../../router/index.js";
import {articleList} from "../../api/article.js";

const page = ref(1); // 分页
const keywords = ref("");
const cate_id = ref("");
const list = ref([]);
const loading = ref(true);
const showTop = ref(false);

const search = ()=>{
    list.value = [];
    page.value = 1;
    getData();
}

const getData = () => {
    loading.value = true;
    articleList({
        page:page.value,
        keyword: keywords.value,
        cate_id:cate_id.value
    }).then(res=>{
        loading.value = false;
        if (res.code === 200){
            list.value.push(...res.data);
        }
    });
}

const toDetail = (item)=>{
    router.push({path:"/article/1"})
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


// 回到顶部
const toTop = ()=>{
    document.body.scrollTop = 0;
    document.getElementById("backTop").scrollTop = -100;
}

</script>

<template>
    <v-card  class="mx-auto primary " id="backTop">
        <v-layout>
            <ArticleHeader></ArticleHeader>
            <v-main class="content-color" id="backTop">
                <!--视频列表-->
                <v-container >
                    <v-row>
                        <v-col cols="12">
                            <div class="search">
                                <input type="text" class="search-input" placeholder="请输入你的关键词，支持全文检索" @blur="search" @keydown.enter="search"/>
                                <div class="search-icon cursor-pointer" @click="search">
                                    <v-icon size="32">mdi-magnify</v-icon>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" xs="12" xl="6"
                               class="cursor-pointer mt-0 pt-0"
                               v-for="(item,index) in list" :key="index" @click="toDetail(item)">
                            <v-card v-ripple>
                                <v-card-title class="text-one-line">{{  item.title }}</v-card-title>
                                <v-card-subtitle>
                                    {{ item.cate ? item.cate.name : ''}}| {{ item.site_name}} |{{ item.updated_at}}
                                </v-card-subtitle>
                                <v-card-text
                                    class="pb-3" >
                                    <div class="text-ten-line" v-html="item.content"></div>
                                </v-card-text>
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
.search{
    position: relative;
    .search-input{
        width: 100%;height: 60px;
        background-color: white;
        opacity: 0.5;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 5px;
    }
    .search-icon{
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

</style>
<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import ArticleHeader from "../layout/ArticleHeader.vue";
import router from "../../router/index.js";
import {th} from "vuetify/locale";
import {articleList} from "../../api/article.js";

const page = ref(1); // 分页
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
    articleList().then(res=>{
        if (res.code === 200){

        }
    });

    // setTimeout(function () {
    //     list.value.push(...mock.mockMovieList);
    //     console.log("page:",page.value)
    //     loading.value = false;
    // },1500)
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
    <v-card  class="mx-auto primary " id="backTop" color="#ccc">
        <v-layout>
            <ArticleHeader></ArticleHeader>
            <v-main class="mt-3" id="backTop">
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
                                <v-card-title class="text-one-line">春节后不想上班的说说大全假期结束不想上班春节后不想上班的说说大全假期结束不想上班的心情说说配图的心情说说配图---{{index}}</v-card-title>
                                <v-card-subtitle>
                                    恋爱宝典| 2023-10-20 0:20:32
                                </v-card-subtitle>
                                <v-card-text class=" pb-3">
                                    1. 每个月都有三十天不想上班。


                                    2. 没有中午休息时间，每天六点半就要起床，单位领导要多有多，同事也总是欺负我善良。我是有多想辞职啊。


                                    3. 明天是节后第一天上班,各位朋友们准备好了吗?明天倒没有什么温差,气温在-℃,不过北风来势汹汹,加上下雨,雨伞和围巾羽绒服都是出门必备品。


                                    4. 春节最后一天啦,大家要警惕节后综合症:


                                    5. 疲惫不堪;神经性厌食;想睡觉;不想上班;工作精神不集中;反应有些迟缓;心情忧郁;感觉孤单;还在回味假期的美好时光。


                                    6. 春节后第一天上班,在西安的第一场雪后,冷冷的,睡眼惺忪的,再也不能贪恋的自然醒去哪呢?


                                    7. 春节即将结束,明天将是节后上班的第一天。从愉快的假期回归工作当中,节后综合征也相伴而来。


                                    8. 明天初八,是节后第一天上班的日子。祝大家八万发财,万事如意!


                                    9. 节后第一天上班,有木有觉得连吃饭时刻都还在发困?有木有发觉长假其实也不长? 速度振作,快速调整,要加油哟!


                                    10. 春节后第一天上班,小伙伴们~心想事成哦!

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
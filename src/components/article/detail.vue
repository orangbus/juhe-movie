<script setup>
import {ref, onMounted, onActivated} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import ArticleHeader from "../layout/ArticleHeader.vue";
import router from "../../router/index.js";
import {articleDetail, articleList} from "../../api/article.js";
import snackbar from "../../utils/snackbar.js";

const id = ref(0);
const page = ref(1);
const list = ref([]);
const loading = ref(true);
const article = ref({});

const getData = () => {
    loading.value = true;
    articleDetail(id.value).then(res=>{
        loading.value = false;
        if (res.code === 200){
            article.value = res.data;
        }else{
            snackbar.error(res.msg);
        }
    })
}

const backUp = ()=>{
    window.history.back()
}

onActivated(()=>{
    id.value = router.currentRoute.value.params.id;
    getData();
})
const toDetail = (item)=>{
    router.push({path:"/article/1"})
}
</script>

<template>
    <v-card  class="mx-auto primary " id="backTop"  color="#ccc">
        <v-layout>
            <ArticleHeader></ArticleHeader>
            <v-main class="mt-0" id="backTop">
                <!--视频列表-->
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title>
                                    <div class="d-flex justify-space-between">
                                        <div>{{  article.title }}</div>
                                        <v-tooltip text="返回列表" >
                                          <template v-slot:activator="{ props }">
                                              <div class="cursor-pointer back-text" v-bind="props" @click="backUp">返回</div>
                                          </template>
                                        </v-tooltip>
                                    </div>
                                </v-card-title>
                                <v-card-subtitle>
                                    {{  article.cate ?  article.cate.name : '' }} | {{ article.updated_at}}
                                </v-card-subtitle>
                                <v-card-text
                                v-html="article.content"
                                >
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <Footer></Footer>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.back-text{
    &:hover{
        color: red;
    }
}
</style>
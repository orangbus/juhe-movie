<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import SearchHeader from "../layout/SearchHeader.vue";

const page = ref(1); // 分页
const list = ref([]);
const loading = ref(true);
const showTop = ref(false);
const gridLeft = ref({
    xl: 9, // 4K 和超宽屏幕
    lg: 9, // 桌面端
    md: 9, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
})
const gridRight = ref({
    xl: 3, // 4K 和超宽屏幕
    lg: 3, // 桌面端
    md: 3, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
})

const getData = () => {
    loading.value = true;
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
        console.log("page:",page.value)
        loading.value = false;
    },1500)
}

onMounted(()=>{
    getData();
})
// 回到顶部
const toTop = ()=>{
    document.body.scrollTop = 0;
    document.getElementById("backTop").scrollTop = -100;
}

</script>

<template>
    <v-card class="mx-auto primary body-color" id="backTop"  v-resize="onResize" >
        <v-layout>
            <SearchHeader :show="false"></SearchHeader>
            <v-main>
                <!--视频列表-->
                <v-container >
                    <v-row>
                        <!--搜索-->
                        <v-col cols="12" class="px-0 search-container">
                            <div class="search">
                                <input type="text" class="search-input" placeholder="请输入视频地址"
                                       v-model="keywords"
                                       @blur="search"
                                       @keydown.enter="search"/>
                                <div class="search-icon cursor-pointer" @click="search">
                                    <v-icon size="32">mdi-play</v-icon>
                                </div>
                            </div>
                        </v-col>

                        <v-col cols="9" class="px-0" v-bind="gridLeft">
                            <div>
                                <iframe
                                    class="movie-player"
                                    allowfullscreen
                                    :allowtransparency="true"
                                    src="http://dummyimage.com/373x238.png/120c2c/441d43"
                                ></iframe>
                            </div>
                        </v-col>
                        <v-col cols="3" v-bind="gridRight">
                            <v-card class="jiexi-list">
                                <v-card-text>
                                    <v-chip-group class="justify-space-between">
                                        <v-col cols="3" v-for="(item,index) in 100" :key="index">
                                            <v-chip label="" >{{ index}}解析</v-chip>
                                        </v-col>
                                    </v-chip-group>
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
.body-color{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 10%);
}
.jiexi-list{
    max-height: 700px;
    overflow-y: scroll;
}
</style>
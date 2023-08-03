<script setup>
import {ref, onMounted} from "vue"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import SearchHeader from "../layout/SearchHeader.vue";
import snackbar from "../../utils/snackbar.js";
import {jiexiList} from "../../api/index.js";

const page = ref(1); // 分页
const list = ref([]);
const loading = ref(true);
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

const preParse = ref({}); // 当前选择的解析
const preParseUrl = ref("https://www.shankubf.com/m3u8/?url="); // 解析地址
const inputUrl = ref("");
const playerUrl = ref("");


const getData = () => {
    loading.value = true;
    jiexiList().then(res => {
        loading.value = false;
        if (res.code === 200) {
            list.value = res.data;
        } else {
            snackbar.error(res.msg);
        }
    });
}

onMounted(() => {
    getData();
})

const player = () => {
    if (inputUrl.value === '') {
        snackbar.info("请输入播放地址")
        return false;
    }
    playerUrl.value = preParseUrl.value + inputUrl.value;
}

const changeParse = (item) => {
    preParseUrl.value = item.url;
    preParse.value = item;
    if (inputUrl.value != '') {
        playerUrl.value = preParseUrl.value + inputUrl.value;
        snackbar.success(`已切换到${item.name}`);
    }
}

</script>

<template>
    <v-card class="mx-auto content-color" id="backTop">
        <v-layout>
            <SearchHeader :show="false"></SearchHeader>
            <v-main>
                <!--视频列表-->
                <v-container>
                    <v-row>
                        <!--搜索-->
                        <v-col cols="12" class="px-0 search-container">
                            <div class="search">
                                <input type="text" class="search-input" placeholder="请输入视频地址"
                                       v-model="inputUrl"
                                       @blur="player"
                                       @keydown.enter="player"/>
                                <div class="search-icon cursor-pointer" @click="player">
                                    <v-icon size="32">mdi-play</v-icon>
                                </div>
                            </div>
                        </v-col>

                        <v-col cols="12" class="px-0 pt-0" v-bind="gridLeft" v-show="playerUrl !== ''">
                            <div>
                                <iframe
                                    class="movie-player"
                                    allowfullscreen
                                    :allowtransparency="true"
                                    :src="playerUrl"
                                ></iframe>
                            </div>
                        </v-col>
                        <v-col cols="12" v-bind="gridRight" class="pr-0 pt-0" v-show="playerUrl !== ''">
                            <v-card class="jiexi-list">
                                <v-card-text>
                                    <div class="d-flex flex-wrap justify-space-between">
                                        <v-col cols="3" v-for="(item,index) in list" :key="index"
                                               @click="changeParse(item)">
                                            <v-hover>
                                                <template v-slot:default="{ isHovering, props }">
                                                    <span class="cursor-pointer">
                                                        <v-chip
                                                            v-bind="props"
                                                            :color="isHovering || preParse.id === item.id ? 'primary' : undefined"
                                                            :label="item.name">{{ item.name }}
                                                    </v-chip>
                                                    </span>
                                                </template>
                                            </v-hover>
                                        </v-col>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row  v-show="playerUrl === ''">
                        <v-alert
                            class="mb-5"
                          title="如何使用"
                        >
                            <div class="pt-3">
                                <div>1、打开各大视频网站,如 <a href="https://v.qq.com" target="_blank">腾讯视频</a></div>
                                <div>
                                    2、如果是需要会员才能观看的视频，直接复制当前播放的地址，粘贴到上面的输入框中，点击播放即可。
                                </div>
                            </div>
                        </v-alert>
                    </v-row>
                </v-container>
                <Footer></Footer>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.jiexi-list {
    max-height: 700px;
    overflow-y: scroll;
}
</style>
<script setup>

import {storeToRefs} from "pinia";
import {useUserStore} from "../../store/index.js";
import MovieToday from "../common/MovieToday.vue";
import { ref} from "vue";
import MyQrCode from "../common/MyQrCode.vue";
import ScoreConversion from "../common/ScoreConversion.vue";
import AppDownload from "../common/AppDownload.vue";
import UserProfile from "../common/UserProfile.vue";
import {scoreList} from "../../api/movie.js";
const {user} = storeToRefs(useUserStore());

const grid = ref({
    xl: 6, // 4K 和超宽屏幕
    lg: 6, // 桌面端
    md: 6, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
});

const gridCard = ref({
    xl: 3, // 4K 和超宽屏幕
    lg: 3, // 桌面端
    md: 3, // 大型号平板到手提电脑
    sm: 4, // 小型号到中型号的平板
    xs: 4 // 小型号到大型号的手机
});

const drawer = ref(false);
const page = ref(1);
const limit = ref(10);
const total = ref(0);
const list = ref([]);
const loading = ref(true);
const getScoreList = ()=>{
    loading.value = true;
    scoreList({
        page:page.value,
    }).then(res=>{
        loading.value = false;
        if (res.code === 200){
            list.value = res.data;
            total.value = res.total;
        }
    });
}
const showScoreList = ()=>{
    getScoreList();
    drawer.value = true;
}

const changePage = (number)=>{
    page.value = number;
    list.value = [];
    getScoreList();

}
const next = ()=>{
    page.value++;
    getScoreList();
}
const prev = ()=>{
    page.value--;
    getScoreList();
}

</script>

<template>
    <v-row >
        <!--个人信息-->
        <v-col cols="12" v-bind="grid">
            <v-card>
                <v-card-title>
                    <UserProfile />
                </v-card-title>
                <v-card-text>
                    <div>手机号：{{ user.phone }}</div>
                    <div>ApiKey: {{ user.api_token}}</div>

                    <div class="d-flex justify-space-between align-center">
                        <v-tooltip location="top" text="查看积分明细">
                            <template v-slot:activator="{ props }">
                                <div class="cursor-pointer" v-bind="props" @click="showScoreList">积分：{{ user.score ?? 0}}</div>
                            </template>
                        </v-tooltip>
                        <div>
                            <v-tooltip location="top" text="邀请码">
                                <template v-slot:activator="{ props }">
                                    <MyQrCode></MyQrCode>
                                </template>
                            </v-tooltip>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>

        <!--应用-->
        <v-col cols="12" v-bind="grid">
            <v-row>
                <v-col cols="4" v-bind="gridCard">
                   <ScoreConversion />
                </v-col>
                <v-col cols="4" v-bind="gridCard">
                   <AppDownload></AppDownload>
                </v-col>
            </v-row>
        </v-col>

        <!--积分明细-->
        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
            width="600"
        >
            <div class="text-center mt-3" v-if="loading === true">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>

            <v-list v-if="loading === false">
                <v-list-item v-for="(item,index) in list" :key="index">
                    <v-list-item-subtitle class="mt-2">
                        <div class="d-flex justify-space-between">
                            <div>{{ item.score}} / {{ item.remark }}</div>
                            <div>{{ item.created_at }}</div>
                        </div>
                    </v-list-item-subtitle>
                    <v-divider class="mt-2"></v-divider>
                </v-list-item>
            </v-list>
            <v-col cols="12">
                <div class="text-center" v-if="total > limit">
                    <v-pagination
                        rounded="circle"
                        v-model="page"
                        :length="Math.trunc(total/(limit === 0 ? 20:limit))"
                        @update:model-value="changePage"
                        @next="next"
                        @prev="prev"
                    ></v-pagination>
                </div>
            </v-col>
        </v-navigation-drawer>

        <MovieToday></MovieToday>
    </v-row>
</template>

<style scoped lang="scss">

</style>
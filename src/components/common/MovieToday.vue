<script setup>

import MovieList from "../layout/MovieList.vue";
import {onActivated, onMounted, ref} from "vue";
import {movieTodayList} from "../../api/movie.js";
const loading = ref(true);
const type = ref(1); // 1、0
const list = ref([]);

const getData = ()=>{
    loading.value = true;
    movieTodayList({type:type.value}).then(res=>{
        loading.value = false;
        if (res.code === 200){
            list.value = res.data;
        }
    })
}

onMounted(()=>{
    getData();
})
onActivated(()=>{
    getData();
})

const changeTab = (number)=>{
    type.value = number;
    list.value = [];
    getData();
}
</script>

<template>
    <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
            <v-tabs>
                <v-tab :value="1" @click="changeTab(1)">今日</v-tab>
                <v-tab :value="0" @click="changeTab(0)">所有</v-tab>
            </v-tabs>
            <div style="font-width: 30px;color: #8b8989;font-size: 10px">追更视频</div>
        </div>
    </v-col>
    <v-col cols="12">
        <movie-list :list="list"></movie-list>
    </v-col>
    <!--加载动画-->
    <v-col cols="12" class="text-center mt-3" v-show="loading">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
    </v-col>
</template>

<style scoped lang="scss">

</style>
<script setup>

import MovieList from "../layout/MovieList.vue";
import {ref} from "vue";
import {mock} from "../../mock/mock.js";
const list = ref(mock.mockMovieList);

const page = ref(0);
const limit = ref(20);
const total = ref(0);
const changePage = (page)=>{
    page.value = page;
    getData();

}
const next = ()=>{
    page.value++;
    getData();
}
const prev = ()=>{
    page.value--;
    getData();
}
</script>

<template>
    <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
            <v-tabs>
                <v-tab>今日跟新</v-tab>
            </v-tabs>
            <div style="font-width: 30px;color: #8b8989;font-size: 10px">追更视频</div>
        </div>
    </v-col>
    <v-col cols="12">
        <movie-list :list="list"></movie-list>
    </v-col>
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
</template>

<style scoped lang="scss">

</style>
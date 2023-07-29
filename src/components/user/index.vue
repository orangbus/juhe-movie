<script setup>

import AppHeader from "../layout/AppHeader.vue";
import Footer from "../layout/Footer.vue";
import {mock} from "../../mock/mock.js";
import {onMounted, ref} from "vue";
import router from "../../router/index.js";
import UserHeader from "../layout/UserHeader.vue";
import MovieList from "../layout/MovieList.vue";

const list = ref([]);
const tab = ref("option-1");

const getData = () => {
    setTimeout(function () {
        list.value.push(...mock.mockMovieList);
    },1500)
}

onMounted(()=>{
    console.log("666")

    getData();
})
</script>

<template>
    <v-card  class="mx-auto primary " id="backTop"  color="#ccc">
        <v-layout>
            <!--头部导航-->
           <UserHeader></UserHeader>

            <v-main class="mt-3">
                <!--视频列表-->
                <v-container >
                    <v-row >
                        <v-col cols="12">
                            <v-window >
                                <v-window-item value="option-1">
                                    <v-card flat>
                                        <v-card-text>
                                            <movie-list :list="list"></movie-list>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                            </v-window>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped lang="scss">

</style>
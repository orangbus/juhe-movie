<script setup>

import EnumData from "../../utils/EnumData.js";

import {defineProps, ref} from "vue";
import router from "../../router/index.js";

const props = defineProps(["list"]);
// const postHeight = ref(250); // 封面图高度 350 250

const toDetail = (item)=>{
    router.push("/detail/"+item.id)
}

</script>

<template>
    <v-row dense fluid>
        <v-col
            v-bind="EnumData.movieGrid"
            v-for="(item,index) in props.list"
            :key="index"
            cols="6"
            @click="toDetail(item)"
        >
            <v-card v-ripple>
                <v-img :src="item.vod_pic"  cover class="align-end text-white movie-poster" >
                    <v-card-title class="text-white" :v-text="item.type_name"></v-card-title>
                </v-img>
                <v-card-text>
                    <div class="movie-title text-one-line">{{ item.vod_name}}</div>
                    <div class="d-flex justify-space-between">
                        <div class="text-one-line">
                            {{ item.vod_remarks }}
                        </div>
                        <div class="text-one-line">
                            {{ item.updated_at.substring(0,10) }}
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.movie-title{
    padding-bottom: 10px;
}
.movie-poster{
    height: 350px;

    @media screen and (max-width: 600px){
        height: 250px;
    }
    /* 在宽度大于 600px 且小于等于 1200px 时应用的样式 */
    @media screen and (min-width: 601px) and (max-width: 1200px) {
        height: 350px;
    }

    /* 在宽度大于 1200px 时应用的样式 */
    @media screen and (min-width: 1201px) {
        height: 350px;
    }
}
</style>
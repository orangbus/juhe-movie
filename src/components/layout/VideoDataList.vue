<script setup>

import EnumData from "../../utils/EnumData.js";

import {defineProps, ref} from "vue";
import router from "../../router/index.js";
const is_detail = ref(false);

const props = defineProps(["list","is_detail"]);
if (props.is_detail != undefined){
    is_detail.value = props.is_detail;
}

const emit = defineEmits(["changeVideo"]);
const changeVideo = (item)=>{
    emit("changeVideo",item)
}

const toDetail = (item) => {
    if (is_detail.value){
        changeVideo(item);
    }else{
        router.push({path:"/video/" + item.id})
    }
}

</script>

<template>
    <v-row dense fluid>
        <v-col
            class="cursor-pointer"
            v-bind="EnumData.movieGrid"
            v-for="(item,index) in props.list"
            :key="index"
            cols="6"
            @click="toDetail(item)"
        >
            <v-hover v-slot="{ isHovering, props }">
                <v-card v-ripple
                        :elevation="isHovering ? 12 : 2"
                        :class="{ 'on-hover': isHovering }"
                        v-bind="props">
                    <v-img
                        cover
                        :src="item.vod_pic"
                        class="text-white movie-poster">
                        <template v-slot:error>
                            <v-img
                                class="mx-auto"
                                height="300"
                                max-width="500"
                                src="/images/default.jpg"
                            >
                            </v-img>
                        </template>
                    </v-img>
                    <v-card-text>
                        <div class="movie-title text-one-line">{{ item.vod_title }}</div>
                        <div class="d-flex justify-space-between">
                            <div class="text-one-line">
                                {{ item.category }}
                            </div>
                            <div class="text-one-line">
                                {{ item.updated_at.substring(0, 10) }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.movie-title {
    padding-bottom: 10px;
}
.movie-type {
    text-align: right;

    span {
        background-color: rgba(0, 0, 0, .4);
        border-radius: 3px;
        padding: 0px 10px;
    }
}

.movie-poster {
    height: 350px;

    @media screen and (max-width: 600px) {
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
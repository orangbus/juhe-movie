<script setup>

import EnumData from "../../utils/EnumData.js";

import {defineProps, ref} from "vue";
import router from "../../router/index.js";
import {storeToRefs} from "pinia";
import {useSettingStore} from "../../store/index.js";
import MoviePlayer from "../common/MoviePlayer.vue";
const detail = ref(false);

const movie = ref({});
const show = ref(false);
const {setting} = storeToRefs(useSettingStore());

const props = defineProps(["list","detail"]);
if (props.detail != undefined){
    detail.value = props.detail;
}

const emit = defineEmits(["player"])
const player = (movie)=>{
    emit("player",movie);
}

const toDetail = (item) => {
    if (setting.value.playType === EnumData.playTypeDialog){
        movie.value = item;
        show.value = true;
    }else if (props.detail){
        player(item);
    }else{
        router.push("/detail/" + item.id)
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
                        <v-card-title class="text-white movie-type">
                            <span>{{ item.type_name }}</span>
                        </v-card-title>
                    </v-img>
                    <v-card-text>
                        <div class="movie-title text-one-line">{{ item.vod_name }}</div>
                        <div class="d-flex justify-space-between">
                            <div class="text-one-line">
                                {{ item.vod_remarks }}
                            </div>
                            <div class="text-one-line">
                                {{ item.updated_at.substring(0, 10) }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-hover>
        </v-col>
        <v-dialog
            v-model="show"
            transition="dialog-bottom-transition"
            max-width="1200"
            :scrollable="true"
            close-delay="0.5"
          >
            <template v-slot:default="{ isActive }">
              <v-card class="p-0 m-0">
                <v-toolbar
                  color="primary"
                  :title="movie.vod_name"
                ></v-toolbar>
                <v-card-text class="p-0 m-0">
                    <MoviePlayer v-if="isActive" :movie="movie"></MoviePlayer>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
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
        height: 240px;
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
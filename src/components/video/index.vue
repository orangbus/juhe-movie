<script setup>

import MovieApiBtn from "../layout/MovieApiBtn.vue";
import VideoHeader from "../layout/VideoHeader.vue";
</script>

<template>
    <!--<VideoHeader></VideoHeader>-->
    <!--<MovieApiBtn></MovieApiBtn>-->

    <v-card>
        <v-img
            class="mx-auto"
            height="300"
            max-width="500"
            src="https://bad.src/not/valid"
        >
            <template v-slot:error>
                <v-img
                    class="mx-auto"
                    height="300"
                    max-width="500"
                    src="/images/default.jpg"
                >
                    <v-card-title class="text-white movie-title"><span>图片中的字</span></v-card-title>
                </v-img>
            </template>
        </v-img>
    </v-card>
</template>

<style scoped lang="scss">
.movie-title{
    text-align: right;
    span{
        background-color: rgba(0,0,0,.4);
        border-radius: 3px;
        padding: 0px 10px;
    }
}
</style>
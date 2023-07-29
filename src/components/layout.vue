<script setup>
import {ref,onMounted} from "vue"
import {mock,} from "../mock/mock.js"
import EnumData from "../Utils/EnumData.js";

const list = ref([]);
const postHeight = ref(250); // 封面图高度 350 250
const links = ref([
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
]);
const drawer = ref(false);
const items =ref(mock.menuList)

const getData = () => {
    list.value.push(...mock.mockMovieList);
}

const onScroll = (e)=>{
    console.log(e)
    console.log(e.target.scrollTop)
}

onMounted(()=>{
    getData();
})

</script>

<template>
    <v-card  class="mx-auto" color="primary" >
        <v-layout>
            <v-app-bar
                color="primary"
                image="https://picsum.photos/1920/1080?random"
            >
                <template v-slot:image>
                    <v-img
                        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
                    ></v-img>
                </template>

                <template v-slot:prepend>
                    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                </template>

                <v-app-bar-title>Title</v-app-bar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                location="left"
                temporary
            >
                <v-list
                    :items="items"
                ></v-list>
            </v-navigation-drawer>

            <v-main id="movie-list">
                <v-container fluid  v-scroll:#movie-list="onScroll">
                    <!--v-scroll:#movie-list="onScroll" style="height: 1000px"-->
                    <v-row dense >
                        <v-col
                            v-bind="EnumData.movieGrid"
                            v-for="(item,index) in list"
                            :key="index"
                            cols="6"
                        >
                            <v-card >
                                <v-img :src="item.vod_pic"  :height="`${postHeight}px`" cover></v-img>
                                <v-card-text>
                                    <div class="movie-title">{{ item.vod_name}}</div>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            {{ item.vod_remarks }}
                                        </div>
                                        <div>
                                            {{ item.updated_at.substring(0,10) }}
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-footer class="bg-pink text-black">
                    <v-row justify="center" no-gutters>
                        <v-btn
                            v-for="link in links"
                            :key="link"
                            color="white"
                            variant="text "
                            class="mx-2 text-black"
                            rounded="xl"
                        >
                            {{ link }}
                        </v-btn>
                        <v-col class="text-center mt-4" cols="12">
                            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                        </v-col>
                    </v-row>
                </v-footer>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.movie-title{
    padding-bottom: 10px;
}
</style>
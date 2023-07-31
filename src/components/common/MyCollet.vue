<script setup>

import MovieList from "../layout/MovieList.vue";
import {onMounted, ref} from "vue";
import {movieCollectClear, movieCollectDelete, movieCollectList} from "../../api/movie.js";
import snackbar from "../../utils/snackbar.js";
const list = ref([]);

const loading = ref(true);
const page = ref(1);
const limit = ref(30);
const total = ref(0);

const getData = ()=>{
    toTop();
    loading.value = true;
    movieCollectList({
        page:page.value,
        limit: limit.value
    }).then(res=>{
        loading.value = false;
        if (res.code === 200){
            res.data.forEach((item)=>{
                if (item.movie != null){
                    list.value.push(item.movie);
                }
            })
            total.value = res.total;
        }

    })
}
onMounted(()=>{
    getData();
})

const clear = ()=>{
    movieCollectClear().then(res=>{
        if (res.code === 200){
            snackbar.success(res.msg);
            list.value = [];
            total.value = 0;
        }else{
            snackbar.error(res.msg);
        }
    });
}

const clearExpire = ()=>{
    let ids = [];
    list.value.forEach(item => {
        if (item.movie === null) {
            ids.push(item.id);
        }
    });
    movieCollectDelete({ids}).then(res => {
        if (res.code === 200) {
            snackbar.success(res.msg)
            getData();
        } else {
            snackbar.error(res.msg);
        }
    });
}

const emit = defineEmits(["toTop"])
const toTop = ()=>{
    emit("toTop");
}

const changePage = (number)=>{
    page.value = number;
    list.value = [];
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
            <div>
                <v-btn color="primary" size="small" @click="clear">清空收藏</v-btn>
                <v-btn color="primary" size="small" class="ml-2" @click="clearExpire">清除本页失效视频</v-btn>
            </div>
            <div style="font-width: 30px;color: #8b8989;font-size: 10px" v-show="total > 0">{{  total }} 条</div>
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
<script setup>

import {onMounted, ref} from "vue";
import UserHeader from "../layout/UserHeader.vue";
import MovieList from "../layout/MovieList.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "../../store/index.js";
import UserCenter from "./UserCenter.vue";
import MyInviteList from "../common/MyInviteList.vue";
import MyCollet from "../common/MyCollet.vue";
import MyHistory from "../common/MyHistory.vue";
import MySetting from "../common/MySetting.vue";

const list = ref([]);
const tab = ref(5);

const {user} = storeToRefs(useUserStore());

const getData = () => {

}

onMounted(()=>{
    getData();
})

const changeTab = (item)=>{
    tab.value = item.id;
}
</script>

<template>
    <v-card  class="mx-auto h-100" id="backTop">
        <v-layout>
            <!--头部导航-->
           <UserHeader @changeTab="changeTab" :tab="tab"></UserHeader>

            <v-main class="mt-3">
                <v-container >
                    <!--个人中心-->
                    <UserCenter v-if="tab === 1"></UserCenter>
                    <MyCollet v-if="tab === 2"></MyCollet>
                    <MyHistory v-if="tab === 3"></MyHistory>
                    <!--我的邀请-->
                    <MyInviteList v-if="tab === 4"></MyInviteList>
                    <MySetting v-if="tab === 5"></MySetting>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped lang="scss">

</style>
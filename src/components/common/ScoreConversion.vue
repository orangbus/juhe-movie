<script setup>

import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore, useWebsiteStore} from "../../store/index.js";
import snackbar from "../../utils/snackbar.js";
import {scoreConversion} from "../../api/movie.js";

const show = ref(false);
const userStore = useUserStore();
const {user} = storeToRefs(userStore);
const websiteStore = useWebsiteStore()
const {scoreSetting} = storeToRefs(websiteStore);
const conversion = ()=>{
    // 获取配置信息
    websiteStore.getScoreSetting();
    show.value = true;
}

const confirm = ()=>{
    if (user.score < scoreSetting.ratio || (user.score/scoreSetting.ratio).toFixed(0) < 1){
        snackbar.warning("积分不足")
        return false;
    }
    scoreConversion().then(res=>{
        if (res.code === 200){
            snackbar.success(res.msg);
            userStore.setUser(res.data.user);
        }else{
            snackbar.error(res.msg);
        }
    });
}

</script>

<template>
    <v-card class="cursor-pointer" @click="conversion" >
        <v-card-text class="text-center" >
            <v-img src="/images/score.png" style="width: 50px;height: 50px;margin: 0 auto "></v-img>
            <div class="mt-3">积分兑换</div>
        </v-card-text>
    </v-card>

    <v-dialog
        v-model="show"
        transition="dialog-bottom-transition"
        max-width="500px"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="积分兑换"
            ></v-toolbar>
            <v-card-text>
                <div class="text-center text-h2">{{ user.score}}</div>
                <p class="text-center mt-1">可获得{{ user.score > 0 ? (user.score/scoreSetting.ratio || 0).toFixed(0) : 0}} 天会员</p>
                <div>兑换规则：</div>
                <div>
                    <p>邀请一个好友，奖励 {{scoreSetting.invite }} 积分</p>
                    <p>观看{{scoreSetting.time }}秒电影，奖励 {{scoreSetting.movie }} 积分</p>
                    <p>奖励比例 {{ scoreSetting.ratio }} 积分奖励 1 天会员，立即生效</p>
                    <p>每日最高获得积分：{{ scoreSetting.max_score == 0 ? '无限制': scoreSetting.max_score+'积分'}}</p>
                </div>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    color="primary"
                    variant="text"
                    @click="confirm"
                >立即兑换</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>

<style scoped lang="scss">

</style>
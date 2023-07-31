<script setup>

import {storeToRefs} from "pinia";
import {useUserStore} from "../../store/index.js";
import MovieToday from "../common/MovieToday.vue";
import {ref} from "vue";
const {user} = storeToRefs(useUserStore());

const grid = ref({
    xl: 6, // 4K 和超宽屏幕
    lg: 6, // 桌面端
    md: 6, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
});

</script>

<template>
    <v-row >
        <v-col cols="12" v-bind="grid">
            <v-card>
                <!--<img :src="user.avatar" alt="" cover>-->
                <v-card-title>
                    <div class="d-flex justify-space-between align-center">
                        <div class="d-flex align-center">
                            <div>{{user.name}}</div>
                            <v-tooltip location="top" text="修改资料">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="ml-1" v-bind="props">mdi-account-edit</v-icon>
                                </template>
                            </v-tooltip>
                        </div>
                        <div>{{user.is_vip ? '会员':''}}</div>
                    </div>
                </v-card-title>
                <v-card-text>
                    <div>{{ user.phone }}</div>
                    <div class="d-flex justify-space-between align-center">
                        <div>ApiKey: {{ user.api_token}}</div>
                        <div>
                            <v-tooltip location="top" text="邀请码">
                                <template v-slot:activator="{ props }">
                                    <v-icon size="32" v-bind="props">mdi-qrcode</v-icon>
                                </template>
                            </v-tooltip>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <!--<v-col cols="12" v-bind="grid">-->
        <!--    <v-card>-->
        <!--        <v-card-title>{{user.name}}</v-card-title>-->
        <!--        <v-card-text>-->
        <!--            <view>{{ user.phone }}</view>-->
        <!--        </v-card-text>-->
        <!--    </v-card>-->
        <!--</v-col>-->
        <MovieToday></MovieToday>
    </v-row>
</template>

<style scoped lang="scss">

</style>
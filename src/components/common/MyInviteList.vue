<script setup>

import {onMounted, ref} from "vue";
import {inviteList} from "../../api/user.js";
import snackbar from "../../utils/snackbar.js";
const list = ref([]);

const loading = ref(true);
const page = ref(0);
const limit = ref(20);
const total = ref(0);
const grid = ref({
    xl: 3, // 4K 和超宽屏幕
    lg: 3, // 桌面端
    md: 6, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
});

const getData = ()=>{
    loading.value = true;
    inviteList({
        page:page.value,
        limit:limit.value
    }).then(res=>{
        loading.value = false;
        if (res.code === 200){
            list.value = res.data;
            total.value = res.total;
        }else{
            snackbar.error(res.msg);
        }
    });
}
onMounted(()=>{
    getData();
})
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
    <v-row>
        <v-col cols="12" class="p-0 m-0">
            <div>累计邀请：{{total}}</div>
            <div><v-icon>mdi-qr</v-icon></div>
            <div></div>
        </v-col>
        <v-col cols="12" v-bind="grid" v-for="(item,index) in list" :key="index">
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-card class="d-flex align-center px-3 user-card"  v-bind="props"
                            :color="isHovering ? 'primary' : undefined">
                        <div>
                            <v-avatar color="info">
                                <span>{{ item.name.substring(0,1) }}</span>
                            </v-avatar>
                        </div>
                        <div class="w-100">
                            <v-card-title>
                                <div class="d-flex justify-space-between">
                                    <div>{{  item.name }}</div>
                                    <div style="font-size: 13px">{{ item.is_vip ? '会员':'' }}</div>
                                </div>
                            </v-card-title>
                            <v-card-subtitle >
                                <div class="d-flex justify-space-between align-center pb-3">
                                    <div>{{  item.phone }}</div>
                                    <div>{{ item.created_at}}</div>
                                </div>
                            </v-card-subtitle>
                        </div>
                    </v-card>
                </template>
            </v-hover>
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
    </v-row>
</template>

<style scoped lang="scss">

</style>
<script setup>

import {ref} from "vue";
const list = ref([]);

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

}
const changePage = (page)=>{
    page.value = page;
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
                                <span>张</span>
                            </v-avatar>
                        </div>
                        <div class="w-100">
                            <v-card-title>
                                <div class="d-flex justify-space-between">
                                    <div>张三</div>
                                    <div style="font-size: 13px">会员</div>
                                </div>
                            </v-card-title>
                            <v-card-subtitle >
                                <div class="d-flex justify-space-between align-center pb-3">
                                    <div>18388112576</div>
                                    <div>2023-10-20 10:00:00</div>
                                </div>
                            </v-card-subtitle>
                        </div>
                    </v-card>
                </template>
            </v-hover>
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
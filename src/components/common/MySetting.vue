<script setup>
import {ref} from "vue";
import EnumData from "../../utils/EnumData.js";
import {useSettingStore} from "../../store/index.js";
import {storeToRefs} from "pinia";
import snackbar from "../../utils/snackbar.js";

const settingStore = useSettingStore();
const {setting} = storeToRefs(settingStore)

const changePageStyle = (number)=>{
    settingStore.setPageStyle(number);
    snackbar.success("设置成功，可能需要刷新页面后才能正常显示");
}

const grid = ref({
    xl: 3, // 4K 和超宽屏幕
    lg: 3, // 桌面端
    md: 3, // 大型号平板到手提电脑
    sm: 12, // 小型号到中型号的平板
    xs: 12 // 小型号到大型号的手机
});
</script>

<template>
    <v-row>
        <v-col cols="12" v-bind="grid">
            <v-card>
                <v-card-title align="center">分页设置</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-radio-group
                        v-model="setting.pageStyle"
                        @update:model-value="changePageStyle">
                        <v-radio
                            v-for="(item,index) in EnumData.pageStyleList" :key="index"
                            :label="item.name" :value="item.type"></v-radio>
                    </v-radio-group>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped lang="scss">

</style>
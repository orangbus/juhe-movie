<script setup>
import {ref} from "vue";
import {useMovieStore, useUserStore} from "../../store/index.js";
import {storeToRefs} from "pinia";
import snackbar from "../../utils/snackbar.js";

const movieStore = useMovieStore();
const {movieApiList,movieApi} = storeToRefs(movieStore);

const dialog = ref(false)
const title = ref("请选择视频接口")
const type = ref(0) // 视频类型
const list = ref(movieApiList.value) // 视频类型
const api = ref(movieApi);
const {user} = storeToRefs(useUserStore());

const update = ()=>{
    movieStore.getMovieApiList();
    snackbar.success("更新成功");
}

const changeType = (value)=>{
    type.value = value;
    if (type.value === 0){
        list.value = movieApiList.value;
        return;
    }
    list.value = [];
    movieApiList.value.forEach(item=>{
        if (type.value == 1 && item.is_vip === 0){
            list.value.push(item)
        }
        if (type.value == 2 && item.is_vip === 1){
            list.value.push(item)
        }
    })
}

const changeApi = (item)=>{
    title.value = item.name;
    api.value = item;
}

const emit = defineEmits(["changeApi"])
const confirm = ()=>{
    movieStore.setMovieApi(movieApi.value);
    dialog.value = false;
    emit("changeApi");
}
</script>

<template>
    <v-dialog
        theme="primary"
        v-model="dialog"
        scrollable
        max-width="500"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                icon
                v-bind="props"
            >
                <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
        </template>
        <v-card color="pick">
            <v-card-title>{{ title }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px;">
                <v-tabs align-tabs="center" v-if="user.vip === 1">
                    <v-tab @click="changeType(0)">全部</v-tab>
                    <v-tab @click="changeType(1)">免费</v-tab>
                    <v-tab @click="changeType(2)">会员</v-tab>
                </v-tabs>
                <v-list rounded>
                    <v-list-item
                        v-repple
                        v-for="(item,index) in  list"
                        :key="index"
                        @click="changeApi(item)"
                        :title="item.name"
                    >
                        <!--v-if="item.default === 1"-->
                        <template v-slot:prepend >
                            <v-avatar v-if="item.id === api.id">
                                <v-icon >mdi-arrow-right</v-icon>
                            </v-avatar>
                        </template>
                        <template v-slot:append>
                            {{ item.is_vip ? '会员':''}}
                        </template>
                    </v-list-item>
                    <v-divider inset></v-divider>
                </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="update"
                >
                    更新接口
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="confirm"
                >
                    确定
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>
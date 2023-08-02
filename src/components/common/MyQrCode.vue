<script setup>

import QrcodeVue from "qrcode.vue";
import {ref} from "vue";
const qrShow = ref(false);

import {storeToRefs} from "pinia";
import {useUserStore, useWebsiteStore} from "../../store/index.js";
const {website} = storeToRefs(useWebsiteStore());
const {user} = storeToRefs(useUserStore());
let baseUrl = ref("http://162.14.72.65");

const url = ref(baseUrl.value+"/login?code="+user.value.api_token)



const show = ()=>{
    qrShow.value = true;
}
</script>

<template>
    <v-dialog
        v-model="qrShow"
        transition="dialog-bottom-transition"
        width="auto"
    >
        <template v-slot:activator="{ props }">
            <v-icon size="32" v-bind="props" @click="show">mdi-qrcode</v-icon>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar
                    color="primary"
                    title="我的邀请二维码"
                ></v-toolbar>
                <v-card-text class="qrcode">
                    <div class="qrcode-img">
                        <QrcodeVue :value="url" :size="300" level="H"></QrcodeVue>
                    </div>
                    <div class="qrcode-title">
                        {{  website.name }}
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">
.qrcode{
    padding: 0px;
    background-color: white;
    width: 350px;
    .qrcode-img{
        width: 100%;
    }
    .qrcode-title{
        text-align: center;
        font-size: 25px;
        color: black;
        padding: 10px 0;
    }
}
</style>
<script setup>
import snackbar from "../../utils/snackbar.js";

const download = ()=>{
    snackbar.success("尽情期待");
}

</script>

<template>
    <v-card class="cursor-pointer" @click="download">
        <v-card-text class="text-center">
            <v-img src="/images/app_download.png" style="width: 50px;height: 50px;margin: 0 auto "></v-img>
            <div class="mt-3">App下载</div>
        </v-card-text>
    </v-card>
</template>

<style scoped lang="scss">

</style>
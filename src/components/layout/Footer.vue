<script setup>
import {storeToRefs} from "pinia";
import {useWebsiteStore} from "../../store/index.js";

const {links} = storeToRefs(useWebsiteStore());
</script>

<template>
    <!--底部导航-->
    <v-footer class="bg-cyan text-black" >
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                variant="text "
                class="mx-2 text-black"
                rounded="xl"
            >
                {{ link.name }}
            </v-btn>
            <v-col class="text-center mt-4 text-white" cols="12">
                {{ new Date().getFullYear() }} — <strong>以上资源来自网络爬虫，如何侵犯你的权益，请联系站长删除相关内容，谢谢！</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<style scoped lang="scss">

</style>
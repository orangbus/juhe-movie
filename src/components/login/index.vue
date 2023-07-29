<script setup>
import {ref} from "vue";
import EnumData from "../../Utils/EnumData.js";
import router from "../../router/index.js";

const phone = ref("");
const password = ref("");
const loading = ref(false);
const is_login = ref(true);
const tab = ref(null);
const items = ref(["登录","注册"])

const login = () => {
    loading.value = true;
    setTimeout(function () {
        loading.value = false;
    },1000)
};

const changeTab = (e) => {
    is_login.value = tab.value === "登录";
};

const openMenu = () => {
    router.push({
        path: "/"
    })
};

</script>

<template>
    <v-card  class="mx-auto primary xyScrollBar container">
        <v-layout>
            <v-app-bar
                color="primary"
                image="https://picsum.photos/1920/1080?random"
            >
                <template v-slot:image>
                    <v-img
                        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
                    ></v-img>
                </template>

                <template v-slot:prepend>
                    <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
                </template>

                <v-app-bar-title>聚合影视</v-app-bar-title>

                <template v-slot:extension>
                    <v-tabs
                        v-model="tab"
                        align-tabs="title"
                        @click="changeTab"
                    >
                        <v-tab
                            v-for="item in items"
                            :key="item"
                            :value="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </template>
            </v-app-bar>

            <v-main class="mt-15" id="backTop">
                <v-container >
                    <v-row>
                        <v-col
                            v-bind="EnumData.grid"
                            cols="12"
                        >
                            <v-sheet class="mx-auto primary px-5 py-15 rounded-lg">
                                <div class="login">{{ is_login ? '登 录' :'注册'}}</div>
                                <v-text-field
                                    v-if="is_login"
                                    v-model="name"
                                    type="text"
                                    required
                                    label="用户名"
                                ></v-text-field>
                                <v-text-field
                                    v-model="phone"
                                    type="number"
                                    required
                                    label="手机号"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    type="password"
                                    required
                                    label="密码"
                                ></v-text-field>

                                <v-btn
                                    :loading="loading"
                                    type="submit"
                                    theme="primary"
                                    color="primary"
                                    block
                                    class="mt-2"
                                    :text="is_login ? '登 录' :'立即注册'"
                                    @click="login"
                                ></v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>

                <v-footer class="bg-pink text-black" style="position: absolute;bottom: 0px;width: 100%;">
                    <v-row justify="center" no-gutters>
                        <v-btn
                            v-for="link in links"
                            :key="link"
                            color="white"
                            variant="text "
                            class="mx-2 text-black"
                            rounded="xl"
                        >
                            {{ link }}
                        </v-btn>
                        <v-col class="text-center mt-4" cols="12">
                            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                        </v-col>
                    </v-row>
                </v-footer>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100vh;
    background-image: url("https://picsum.photos/id/11/1400/800");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    flex-shrink: 0;
}
.login{
    font-size: 1.6rem;
    margin-bottom: 30px;
    text-align: center;
}
</style>
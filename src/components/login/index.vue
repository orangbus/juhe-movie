<script setup>
import {ref} from "vue";
import EnumData from "../../utils/EnumData.js";
import router from "../../router/index.js";
import snackbar from "../../utils/snackbar.js";
import {useUserStore, useWebsiteStore} from "../../store/index.js";
import {login, register} from "../../api/index.js";
import LocalStorage from "../../utils/LocalStorage.js";
import {storeToRefs} from "pinia";

const phone = ref("");
const password = ref("");
const loading = ref(false);
const is_login = ref(true);
const tab = ref(null);
const items = ref(["登录","注册"])

const userStore = useUserStore();
const {links} = storeToRefs(useWebsiteStore());

const submitLogin = () => {
    if (phone.value == ""){
        return snackbar.warning("请输入手机号");
    }
    if (password.value == ""){
        return snackbar.warning("请输入密码");
    }
    if (is_login){
        loading.value = true;
        login({
            phone:phone.value,
            password:password.value,
        }).then(res=>{
               loading.value = false;
            if (res.code === 200){
               let {access_token,user,refresh_token} = res.data;
               LocalStorage.set(EnumData.tokenLabel,access_token);
               LocalStorage.set(EnumData.refreshTokenLabel,refresh_token);
                userStore.setUser(user);
                router.push({path:"/?refresh=true"})
            }else{
                snackbar.error(res.msg);
            }
        });
    }else{
        if (name.value == ""){
            return snackbar.warning("请输入用户名");
        }
        loading.value = true;
        register({
            name:name.value,
            phone:phone.value,
            password:password.value,
        }).then(res=>{
               loading.value = false;
            if (res.code === 200){
                let {access_token,user,refresh_token} = res.data;
                LocalStorage.set(EnumData.tokenLabel,access_token);
                LocalStorage.set(EnumData.refreshTokenLabel,refresh_token);
                useUserStore().setUser(user);
                router.push({path:"/?refresh=true"})
            }else{
                snackbar.error(res.msg);
            }
        });
    }
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
    <v-card  class="mx-auto bg-primary xyScrollBar container">
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
                                <v-divider />
                                <v-text-field
                                    v-if="!is_login"
                                    v-model="name"
                                    type="text"
                                    required
                                    label="用户名"
                                    variant="outlined"
                                ></v-text-field>
                                <v-text-field
                                    v-model="phone"
                                    type="number"
                                    required
                                    label="手机号"
                                    maxlength="11"
                                    variant="outlined"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    type="password"
                                    required
                                    label="密码"
                                    variant="outlined"
                                ></v-text-field>

                                <v-btn
                                    :loading="loading"
                                    type="submit"
                                    theme="primary"
                                    color="primary"
                                    block
                                    class="mt-2"
                                    :text="is_login ? '登 录' :'立即注册'"
                                    @click="submitLogin"
                                ></v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>

                <v-footer class="bg-primary text-black" style="position: absolute;bottom: 0px;width: 100%;">
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
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100vh;
    background-image: url("/images/login-bg.png");
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
<script setup>
import {storeToRefs} from "pinia";
import {useUserStore} from "../../store/index.js";
import {onMounted, reactive, ref} from "vue";
import snackbar from "../../utils/snackbar.js";
import {userStore} from "../../api/user.js";

const userStoreInfo = useUserStore();
const {user} = storeToRefs(userStoreInfo);
const show = ref(false);
const loading = ref(false);
const form = reactive({
    name: "",
    phone: "",
    password: '',
    avatar: "",
    email:"",
    sex:1
})

const showEdit = () => {
    show.value = true;
}

const submitForm = ()=>{
    loading.value = true;
    userStore(form).then(res=>{
        loading.value = false;
        let {code,msg} = res;
        snackbar.resultMsg(code,msg);
        if (res.code === 200){
            userStoreInfo.setUser(res.data);
            show.value = false;
        }
    });
}


onMounted(()=>{
    form.name = user.value.name || '';
    form.phone = user.value.phone || '';
    form.email = user.value.email || '';
})

</script>

<template>
    <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
            <v-tooltip location="right" text="修改资料">
                <template v-slot:activator="{ props }">
                    <div>{{ user.name }}</div>
                    <v-icon class="ml-1 cursor-pointer" v-bind="props" @click="showEdit">mdi-account-edit</v-icon>
                </template>
            </v-tooltip>
        </div>
        <div>{{ user.is_vip ? '会员' : '' }}</div>
    </div>

    <v-dialog
        transition="dialog-bottom-transition"
        width="400px"
        v-model="show"
    >
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar
                    color="primary"
                    title="编辑个人信息"
                ></v-toolbar>
                <v-card-text>
                    <v-text-field label="手机号" variant="underlined" v-model="form.phone"></v-text-field>
                    <v-text-field label="用户名" variant="underlined" v-model="form.name"></v-text-field>
                    <v-text-field label="密码" variant="underlined" v-model="form.password"></v-text-field>
                    <v-text-field label="邮箱" variant="underlined" v-model="form.email" placeholder="后期可用于找回密码"></v-text-field>
                    <!--<v-text-field label="avatar" variant="underlined" v-model="form.avatar" placeholder="头像链接地址"></v-text-field>-->
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        variant="text"
                        :loading="loading"
                        @click="submitForm"
                    >确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>
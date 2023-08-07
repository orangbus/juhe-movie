<script setup>

import {ref} from "vue";
import snackbar from "../../utils/snackbar.js";
import {couponStore} from "../../api/coupon.js";
import {useUserStore} from "../../store/index.js";

const code =ref("");
const loading = ref(false);
const show = ref(false);

const userStore = useUserStore();

const open = ()=>{
    show.value = true;
}

const submit = ()=>{
    if (code.value == "") {
        snackbar.warning("请输入激活码");
        return false;
    }
    loading.value = true;
    couponStore({code:code.value}).then(res=>{
        loading.value = false;
        if (res.code === 200){
            snackbar.success(res.msg);
            show.value = false;
            // 跟新用户信息
            userStore.setUser(res.data);
         }else{
            snackbar.error(res.msg);
         }
    });
}

</script>

<template>
<v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <template v-slot:activator="{ props }">
        <v-tooltip text="激活码" v-bind="props">
            <template v-slot:activator="{ props }">
                <v-btn icon @click="open" v-bind="props">
                    <v-icon>mdi-ticket-percent-outline</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card width="400">
        <v-toolbar
          color="primary"
          title="请输入激活码"
        ></v-toolbar>
        <v-card-text>
          <v-text-field v-model="code" label="激活码" variant="underlined" ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              :loading="loading"
            variant="text"
            @click="submit"
          >立即激活</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
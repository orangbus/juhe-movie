<script setup>
</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
/* 滚动槽 */
::-webkit-scrollbar {
    width: 5px;
    height: 6px;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0,0,0,0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
}
/*!* 滚动条滑块 *!*/
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}
</style>

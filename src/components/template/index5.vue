<template>
    <div class="scroll-container" ref="container" @scroll="handleScroll">
        <!-- Your content to be scrolled -->
        <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const container = ref(null);
const items = reactive([]);
let page = 1;
let isLoading = false;

const loadMore = () => {
    if (isLoading) return;

    // Simulate an API call to fetch more data
    isLoading = true;
    setTimeout(() => {
        const newData = getMoreData(); // Replace this with your actual data fetching logic
        items.push(...newData);
        page++;
        isLoading = false;
    }, 1000); // Simulating a delay, adjust as per your needs
};

const handleScroll = () => {
    const el = container.value;
    console.log("clientHeight",el.clientHeight)
    
    const isBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
    if (isBottom) {
        loadMore();
    }
};

onMounted(() => {
    // Attach the scroll event listener when the component is mounted
           loadMore();
    container.value.addEventListener('scroll', handleScroll);
});

// onUnmounted(() => {
//     // Detach the scroll event listener when the component is unmounted
//     container.value.removeEventListener('scroll', handleScroll);
// });

const getMoreData = () => {
    // Replace this with your actual data fetching logic using Axios, fetch, etc.
    // For demonstration purposes, I'm just returning some dummy data here.
    return Array.from({ length: 20 }, (_, index) => ({
        id: items.length + index + 1,
        name: `Item ${items.length + index + 1}`
    }));
};
</script>

<style>
.scroll-container {
    height: 300px;
    overflow-y: auto;
    border: 1px solid red;
}
</style>

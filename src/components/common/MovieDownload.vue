<script setup>

import snackbar from "../../utils/snackbar.js";

const props = defineProps(["movie", "downloadList"]);
import useClipboard from "vue-clipboard3";

const {toClipboard} = useClipboard();
import {saveAs} from 'file-saver';

const copyUrl = async (url) => {
    try {
        await toClipboard(url);
        await snackbar.success("复制成功");
    } catch (e) {
        snackbar.error("复制失败");
    }
}

const download = () => {
    const name = props.movie.vod_name;
    const textArray = [
        "accept: */*",
        "accept-encoding: gzip, deflate, br",
        "accept-language: zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control: no-cache",
        "dnt: 1",
        "pragma: no-cache",
        "sec-fetch-dest: empty",
        "sec-fetch-mode: cors",
        "sec-fetch-site: same-origin",
        "user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
    ];
    if (props.downloadList.length > 0) {
        props.downloadList.forEach(item => {
            textArray.push(`${name}-${item.name},${item.url}`);
        });
        let str = new Blob([textArray.join("\r\n")], {
            type: "text/plain;charset=utf-8"
        })
        saveAs(str, `${name}.txt`);
    } else {
        snackbar.error("暂无下载内容");
    }
}

</script>

<template>
    <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        scrollable
    >
        <template v-slot:activator="{ props }">
            <v-icon size="35"
                    class="ml-2 cursor-pointer"
                    v-bind="props"
            >mdi-download
            </v-icon>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar
                    color="primary"
                    :title="movie.vod_name"
                    flat="true"
                ></v-toolbar>
                <v-card-text>
                    <p> 视频下载可参考这个大考的 <a href="https://github.com/sudot/m3u8">github</a>,下载速度还是可以的，不会使用可加群需求帮助，下载的格式点击下方下载。</p>
                    <p>单视频下载：go run main.go -u=http://example.com/index.m3u8</p>
                    <p>批量下载：go run main.go -f=data/test.txt -o=data/example</p>
                    <p>如果点击无法复制，可能是浏览器不支持，手动复制一下吧</p>
                    <!--<v-checkbox label="全选" :items="[0]" item-value="1"></v-checkbox>-->
                    <v-list style="margin-bottom: -20px">
                        <v-list-item
                            v-for="(item,index) in props.downloadList"
                            :key="index"
                            :title="item.name"
                            :subtitle="item.url"
                        >
                            <!--<template v-slot:prepend>-->
                            <!--    <v-checkbox model-value="1" :active="true"></v-checkbox>-->
                            <!--</template>-->

                            <template v-slot:append>
                                <v-btn
                                    color="grey-lighten-1"
                                    icon="mdi-content-copy"
                                    variant="text"
                                    @click="copyUrl(item.url)"
                                ></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        color="primary"
                        variant="text"
                        @click="download"
                    >下载
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>
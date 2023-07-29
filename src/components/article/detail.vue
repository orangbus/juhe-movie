<script setup>
import {ref,onMounted} from "vue"
import {mock} from "../../mock/mock.js"
import MovieList from "../layout/MovieList.vue";
import Footer from "../layout/Footer.vue";
import ArticleHeader from "../layout/ArticleHeader.vue";
import router from "../../router/index.js";
import {articleList} from "../../api/article.js";

const page = ref(1); // 分页
const list = ref([]);
const loading = ref(true);
const showTop = ref(false);

const getData = () => {
    loading.value = true;

    // setTimeout(function () {
    //     list.value.push(...mock.mockMovieList);
    //     console.log("page:",page.value)
    //     loading.value = false;
    // },1500)
}

const backUp = ()=>{
    window.history.back()
}

onMounted(()=>{
    getData();
    window.addEventListener("scroll",handleScroll);
})
const handleScroll = ()=> {
    // 获取滚动位置
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 获取可视区域高度
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    // 获取页面内容的高度
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断是否滚动到页面底部（偏移值设为 50px）
    if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading.value) {
        page.value +=1;
        getData();
    }
}


const toDetail = (item)=>{
    router.push({path:"/article/1"})
}
</script>

<template>
    <v-card  class="mx-auto primary " id="backTop"  color="#ccc">
        <v-layout>
            <ArticleHeader></ArticleHeader>
            <v-main class="mt-0" id="backTop">
                <!--视频列表-->
                <v-container>
                    <v-row>
                        <v-col cols="9">
                            <v-card>
                                <v-card-title>
                                    <div class="d-flex justify-space-between">
                                        <div>春节后不想上班的说说大全假期结束不想上班的心情说说配图</div>
                                        <div class="cursor-pointer back-text" @click="backUp">返回</div>
                                    </div>
                                </v-card-title>
                                <v-card-subtitle>
                                    恋爱宝典 | 2023-10-10 0:20:00
                                </v-card-subtitle>
                                <v-card-text
                                v-html="`1. 每个月都有三十天不想上班。

                                    2. 没有中午休息时间，每天六点半就要起床，单位领导要多有多，同事也总是欺负我善良。我是有多想辞职啊。

                                    3. 明天是节后第一天上班,各位朋友们准备好了吗?明天倒没有什么温差,气温在-℃,不过北风来势汹汹,加上下雨,雨伞和围巾羽绒服都是出门必备品。

                                    4. 春节最后一天啦,大家要警惕节后综合症:

                                    5. 疲惫不堪;神经性厌食;想睡觉;不想上班;工作精神不集中;反应有些迟缓;心情忧郁;感觉孤单;还在回味假期的美好时光。


                                    6. 春节后第一天上班,在西安的第一场雪后,冷冷的,睡眼惺忪的,再也不能贪恋的自然醒去哪呢?


                                    7. 春节即将结束,明天将是节后上班的第一天。从愉快的假期回归工作当中,节后综合征也相伴而来。


                                    8. 明天初八,是节后第一天上班的日子。祝大家八万发财,万事如意!


                                    9. 节后第一天上班,有木有觉得连吃饭时刻都还在发困?有木有发觉长假其实也不长? 速度振作,快速调整,要加油哟!


                                    10. 春节后第一天上班,小伙伴们~心想事成哦!


                                    11. 亲,春节后第一天上班,感觉如何?有收获惊喜不?带着新一年的欣喜与希望入睡,晚安!


                                    12. 节后第一天上,小雨下不停!这天气,明显就是适合赖床天气嘛!


                                    13. 春节后!第一天上班!这心情怎么跟上坟一样呢!无比沉痛!痛不欲生痛!抓心挠肺的!


                                    14. 春节后第一天上班,耳朵里听到最多的话就是过年好!然后就是喝了多少多少酒呀!醉倒几个亲朋呀的话题!就奇怪了,他们怎么能喝那么多的酒啊??收回心来,用心工作!


                                    15. 今天春节后第一天上班,困得我,无法形容!春困秋乏夏打盹冬眠。一年四季都是想睡觉!希望明天一切恢复往常!


                                    16. 节后第一天上班,道路湿滑,能见度较低,出行请注意安全


                                    17. 这雪洒洒了小时,明天是节后第一天上班,能准时到吗?


                                    18. 我想有没有人和我一样,希望春节后上班第一天听到的不是“新年快乐”,而是“咦,你瘦了”[嘻嘻] [嘻嘻]


                                    19. 我不想，我不想上班，一上班就要起早床，我不想，我不想不想上班，累成狗还没啥钱，我不想，我不想不想上班，反正也没开门红包拿，去他的上班!起床!上班去呀!


                                    20. 从假期中返回到工作岗位上一下子还有点儿适应不过来。


                                    21. 我节后上班第一感受:累 懒 ,啥事儿都不爱干,不爱动弹。


                                    22. 假期综合症，不知道要多长时间才能调节回来


                                    23. 每天早上醒来都在想爷不干了，二十分钟后孙子一样的上班了。


                                    24. 年年打工年年愁，天天加班像只猴，加班加点无报酬，天天挨骂无理由。


                                    25. 我也是每天上班来坐着，上班无聊，不上班我想会更无聊。还是天天来公司耗吧。



                                    26. 我想早日脱离苦海老，太累了，都像个老太婆老样。


                                    27. 我失恋了什么心思都没有了没有了斗志不想上班什么都不想去做了。


                                    28. 特么说白了，就一句话，我就是不想上班，没心情。


                                    29. 钱赚够了，不想上班了。


                                    30. 每天早上醒来都在想爷不干了，二十分钟后孙子一样的上班了。


                                    31. 世上最痛苦的事情就是上班，你每天都在抗拒，但是却每天都得做。


                                    32. 你不是风儿，我也不是沙，再缠绵也到不了天涯，擦干了泪，明天早上，我们都要上班。


                                    33. 最近工作很累，不知各位兄弟姐妹情况如何!


                                    34. 匆匆地我走了,正如我匆匆地来挥一挥手,跟你说声再见!


                                    35. 起床困难户，不想起床，不想上班。


                                    36. 每月总有那么几天不想上班。


                                    37. 每个月至少都有三十天不想上班。`"
                                >
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3" >
                            <v-card>
                                <v-card-title style="border-bottom: 1px solid #ccc">推荐</v-card-title>
                                <v-list>
                                    <v-list-item
                                        class="text-one-line cursor-pointer"
                                        v-for="(item,index) in 20" :key="index"
                                    @click="toDetail(item)"
                                    >春节后不想上班的说说大全假期结束不想上班的心情说说配图</v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <Footer></Footer>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style lang="scss" scoped>
.back-text{
    &:hover{
        color: red;
    }
}
</style>
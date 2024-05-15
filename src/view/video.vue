<template>
  <div>
    <div id="container" class="container">
        <!-- <span id="loading" class="loading" :data-percent="percent" :style="`backgroundSize:${percent}% 100%`"></span> -->
        <img v-for="(item,index) in srcList" :key="index" :src="`/src/assets/imgs/video/${item}`" :alt="`视频的帧${index}`" v-show="curIndex==index">
    </div>
    
  </div>
</template>
<script setup>
import { ref,onBeforeMount } from 'vue';

const srcList=ref({})
const percent = ref(0)
const indexRange = ref([]);
const maxLength = ref(0);
const curIndex = ref(1)

const play =  () => {
    // loading进度
    percent.value = Math.round(100 * srcList.value.length / maxLength.value);
    // 全部加载完毕，无论成功还是失败
    if (percent.value == 100) {
        var index = indexRange.value[0];
        var step =  () => {
            // 序列增加
            index++;
            // 如果超过最大限制
            if (index <= indexRange.value[1]) {
                curIndex.value = index
                setTimeout(step, 200);
            } else {
                // 本段播放结束回调
                index = 1;
                curIndex.value = index
                setTimeout(step, 200);
            }
        };
        // 等100%动画结束后执行播放
        setTimeout(step, 100);
    }
};
onBeforeMount(()=>{
  for(let i = 1; i < 51; i++){
    srcList.value[i] = `output2_out00${i<10?`0${i}`:i}.jpg`
    srcList.value.length = i
  }
  indexRange.value = [1, srcList.value.length]
  maxLength.value = indexRange.value[1] - indexRange.value[0] + 1
  play()
})
</script>
<style lang="css" scoped>
.container {
    width: 100%; 
    height: 100vh;
    margin: auto;
    /* background-color: #000; */
    position: relative;
}
.container  img {
    position: absolute;
    /* width: 100%; 
    height: 100%; */
    width: 640px;
    height: 360px;
}
.loading {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
    height: 8px; 
    width: 150px;
    border: 1px solid #eee;
    background: linear-gradient(to top, #eee, #eee);
    background-size: 0 100%;
    transition: background-size .1s;
}
.loading::before {
    content: attr(data-percent)'%';
    position: absolute;
    left: 0; top: -1.5em;
    font-size: 12px;
    color: #eee;
}
</style>
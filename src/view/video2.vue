<template>
  <div>
    <canvas id="canvas" width="1440px" height="720px"></canvas>
    <button @click="generator">点击生成</button>
    <button @click="diownLoad" style="margin-left: 10px;">点击下载</button>
    <div id="As">
      <a :href="item" v-for="(item, index) in hrefs" :key="index" :download="`${index}.png`" style="word-wrap: break-word;  height: 30px; line-height: 30px; padding: 0 10px; width: 30px; display: inline-block; overflow: hidden; text-align: center;">{{ index }}</a>
    </div>
  </div>
</template>
<script setup>
import { ref,onBeforeMount,onMounted,watch } from 'vue';
const hrefs=ref([])
let animationId = null;
const init = () =>{
  // 创建canvas
  const canvas = document.getElementById("canvas");
  // 创建一个虚拟video元素
  const videoEl = document.createElement("video");
  videoEl.src = "/src/assets/video/bmtd.mp4";
  // 重要：由于浏览器限制自动播放问题，则需要使用无声播放即可实现自动播放
  videoEl.muted = "muted"; 
  // videoEl.autoplay = "autoplay";
  // videoEl.loop = "loop";
  videoEl.addEventListener('loadedmetadata', () => {
    // 设置canvas尺寸与视频尺寸相同
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const cvsWidth = canvas.width;
    const cvsHeight = canvas.height;
    const ctx = canvas.getContext("2d");
    // 使用requestAnimationFrame定时器实现canvas绘制video每一帧
    const videoRender = () => {
      animationId = window.requestAnimationFrame(videoRender);
      ctx.clearRect(0, 0, cvsWidth, cvsHeight);
      ctx.drawImage(videoEl, 0, 0, cvsWidth, cvsHeight);
      const dataURL = canvas.toDataURL('image/png', 1); // 转换为data URL
      hrefs.value.push(dataURL)
    };
    window.requestAnimationFrame(videoRender);
    videoEl.play();
});
  
watch(hrefs.value, (val)=>{
  if(val.length === 550){
    // 取消动画循环
    if (animationId) {
      window.cancelAnimationFrame(animationId);
      animationId = null; // 重置ID，表示动画已停止
    }
  }
})  
  
}
const diownLoad=()=>{
  document.querySelectorAll('a').forEach(function(button,index) {
    setTimeout(() => {
      button.click()
    }, index * 1000)
  });
}
const generator = ()=>{
  init()
}
onMounted(()=>{
  
})
onBeforeMount(()=>{})
</script>
<style lang="css" scoped>

</style>
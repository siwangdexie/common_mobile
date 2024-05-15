<template>
  <div class="box">
    <template v-for="(item,index) in imgList" :key="index" >
      <img :src="item" :alt="index" v-show="index==curIndex+2"></img>
    </template>
    <div v-if="showFoot">模拟展示邮箱</div>
  </div>
</template>
<script setup>
import { ref,onBeforeMount,onMounted,watch,computed } from 'vue';
const time = ref(18) // 动画时间
const total = ref(226) // 总图片张数
const showFoot = ref(false); // 显示页脚
const isBottom = ref(true); // 是否滑动到底部
const imgList=ref([]) // 图片的列表
const curIndex = ref(0) // 当前的序号
const delta = ref(-1) // 默认鼠标滚轮向下方向
const inteval = ref(null) // 保存定时器
const intervalPerTime = ref(1000) // 根据时间和张数，计算定时器的时间
const getLast3s = ref(0) // 计算最后3s需要显示邮箱
// 是否显示弹窗
const isShow = ref(false);
const init = () =>{
  clearInterval(inteval.value)
  intervalPerTime.value = parseFloat((time.value * 1000 / total.value).toFixed(4))
  getLast3s.value = Math.floor(total.value * (1 - 3 / time.value))

  for(let i=1; i<total.value; i++){
    imgList.value.push(`/src/assets/imgs/video2/${i}.png`)
  }
  const canSeek = () => {
    // 防止请求过多
    let can = true;
    if (!can) {
      return false;
    } else {
      can = false;
      setTimeout(() => {
        can = true;
      }, 500);
      return true;
    }
  };
  const downScroll = () => {
    if (isBottom.value && canSeek() && isShow.value) {
      reset(1.1)
    }
  };
  const upScroll = () => {
    if (isBottom.value && canSeek()) {
      if (showFoot.value) {
        showFoot.value = false;
        isShow.value = false
      }
      reset(1.1)
    }
  };
  document.addEventListener("mousewheel", function (event) {
    // Chrome、Safari、IE的mousewheel事件，滚轮向上滚动时event.wheelDelta值为120的倍数，向下滚动时为-120的倍数
    // Firefox的mousewheel事件，滚轮向上滚动时event.detail值为-3的倍数，向下滚动时为3的倍数
    delta.value = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    // 在此处理滚轮事件 
    if (delta.value > 0) {
      // console.log('鼠标滚轮向上')
      upScroll();
    } else if (delta.value < 0) {
      // console.log('鼠标滚轮向下')
      downScroll();
    }
  });
  // 需要定时器执行的序号的++--操作
  const animate = () => {
    if(delta.value > 0){
      if(curIndex.value == 0) {
        clearInterval(inteval.value)
      } else{
        curIndex.value --
      }
    } else{
      if(curIndex.value >= total.value) {
        curIndex.value = total.value - 1
        clearInterval(inteval.value)
      } else{
        curIndex.value ++
        if(curIndex.value === getLast3s.value){
          showFoot.value = true
        }
      }
    }
  }
  // 启动定时器
  const start = () => {
    inteval.value = setInterval(() => {
      animate()
    }, intervalPerTime.value);
  }
  // 鼠标滚动的时候加速或者减速视频播放，重启定时器
  const reset = (multiplier = 0.9) => {
    clearInterval(inteval.value)
    time.value = time.value * multiplier
    start()
  }
  start()
}
onMounted(()=>{
  init()
})
</script>
<style lang='scss' scoped>
.box{
  position: relative;
  img{
    display: block;
  }
}
</style>
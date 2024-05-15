<template>
  <div class="box" :style="animationVal"></div>
  {{ animationVal }}
</template>
<script setup>
import { ref,onBeforeMount,onMounted,watch,computed } from 'vue';
const time = ref(18)
const direction = ref('normal')
const palyState = ref('running')
const showFoot = ref(false);
const isBottom = ref(true);
// 是否显示弹窗
const isShow = ref(false);
const init = () =>{
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
    if (isBottom.value && canSeek()) {
      direction.value = 'normal'
    }
  };
  const upScroll = () => {
    if (isBottom.value && canSeek()) {
      if (showFoot.value) {
        showFoot.value = false;
        isShow.value = false
      } else {
        palyState.value = 'pause'
        direction.value = 'reverse'
        setTimeout(()=>{
          palyState.value = 'running'
        },300)
      }
    }
  };
  document.addEventListener("mousewheel", function (event) {
    console.log('document的mousewheel事件')
    // Chrome、Safari、IE的mousewheel事件，滚轮向上滚动时event.wheelDelta值为120的倍数，向下滚动时为-120的倍数
    // Firefox的mousewheel事件，滚轮向上滚动时event.detail值为-3的倍数，向下滚动时为3的倍数
    var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    // 在此处理滚轮事件 
    if (delta > 0) {
      console.log('鼠标滚轮向上')
      upScroll();
    } else if (delta < 0) {
      console.log('鼠标滚轮向下')
      downScroll();
    }
  });
}
// 计算动画
const animationVal = computed(()=>{
  return `animation-duration: ${time.value}s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-direction: ${direction.value};
    animation-play-state: ${palyState.value};`
})
onMounted(()=>{
  init()
})
</script>
<style lang='scss' scoped>
$time : 18; // 动画播放时间
$rate: 30; // 帧速率
$total: 228; // 总数
@mixin generateKeyframes() {
  @for $i from 1 through 228 {
    #{$i / $total * 100}% {
      background-image: url('/src/assets/imgs/video2/#{$i - 1}.png');
    }
  }
}
@mixin loadAllImg(){
  $list: ();
  @for $i from 1 through 228 {
    $list: append($list, url('/src/assets/imgs/video2/#{$i - 1}.png'), comma);
  }
  background-image:$list;
}
@keyframes changeBackgroundImage {
  @include generateKeyframes();
}
.box{
  @include loadAllImg();
  width: 1440px;
  height: 720px;
  will-change: background-image;
  // animation: changeBackgroundImage #{$time}s ease-in-out infinite;
  animation-name: changeBackgroundImage;
  // animation-duration: #{$time}s;
  // animation-timing-function: ease-in-out;
  // animation-iteration-count: infinite;
  // animation-direction: normal;
}
</style>
<script setup>
import { ref } from "vue";
defineProps({
  msg: String,
});
const count = ref(0);
const str = ref("满");
</script>

<template>
  <!-- <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->

  <div class="test">
    <div class="ellips">
      <div
        class="dot"
        :class="`dot-${index + 1}`"
        v-for="(item, index) in str"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.read-the-docs {
  color: #888;
}
.test {
  $a: 160px; // 椭圆x轴半径(长半径)
  $b: 80px; // 椭圆y轴半径(短半径)
  $s: 40; // 坐标点的数目(数目越大，动画越精细)
  .ellips {
    width: $a * 2;
    height: $b * 2;
    border-radius: 100%;
    border: 1px solid #e07007;
    position: relative;
    margin: 30px 0 0 20px;
  }
  .dot {
    width: 20px;
    height: 20px;
    left: $a - 10px;
    top: $b - 10px;
    background: rgb(228, 72, 0);
    border-radius: 100%;
    position: absolute;
    animation: move 10s linear infinite;
    color: #fff;
    line-height: 20px;
    font-size: 14px;
  }
  @for $i from 1 through $s {
    // 动画阶段的百分比
    $keyframeSel: calc( $i * 100% / $s );
    .dot-#{$i} {
      left: calc($a + 10px * $i);
      // top: $keyframeSel;
    }
  }
  @keyframes move{
    @for $i from 1 through $s {
      // 动画阶段的百分比
      $keyframeSel: calc( $i * 100% / $s );
      #{$keyframeSel} {
        transform: translate(
          calc($a * cos(360deg/$s*$i)),
          calc($b * sin(360deg/$s*$i))
        );
      }
    }
  }
  /* @keyframes move {
    100% {
      transform: translate(160px, 0px);
    }
    97.5% {
      transform: translate(158.0301345px, -12.5147572px);
    }
    95% {
      transform: translate(152.16904261px, -24.72135955px);
    }
    92.5% {
      transform: translate(142.56104387px, -36.31923998px);
    }
    90% {
      transform: translate(129.4427191px, -47.02282018px);
    }
    87.5% {
      transform: translate(113.13708499px, -56.56854249px);
    }
    85% {
      transform: translate(94.04564037px, -64.72135955px);
    }
    82.5% {
      transform: translate(72.63847996px, -71.28052194px);
    }
    80% {
      transform: translate(49.4427191px, -76.0845213px);
    }
    77.5% {
      transform: translate(25.02951441px, -79.01506725px);
    }
    75% {
      transform: translate(0px, -80px);
    }
    72.5% {
      transform: translate(-25.02951441px, -79.01506725px);
    }
    70% {
      transform: translate(-49.4427191px, -76.0845213px);
    }
    67.5% {
      transform: translate(-72.63847996px, -71.28052194px);
    }
    65% {
      transform: translate(-94.04564037px, -64.72135955px);
    }
    62.5% {
      transform: translate(-113.13708499px, -56.56854249px);
    }
    60% {
      transform: translate(-129.4427191px, -47.02282018px);
    }
    57.5% {
      transform: translate(-142.56104387px, -36.31923998px);
    }
    55% {
      transform: translate(-152.16904261px, -24.72135955px);
    }
    52.5% {
      transform: translate(-158.0301345px, -12.5147572px);
    }
    50% {
      transform: translate(-160px, 0px);
    }
    47.5% {
      transform: translate(-158.0301345px, 12.5147572px);
    }
    45% {
      transform: translate(-152.16904261px, 24.72135955px);
    }
    42.5% {
      transform: translate(-142.56104387px, 36.31923998px);
    }
    40% {
      transform: translate(-129.4427191px, 47.02282018px);
    }
    37.5% {
      transform: translate(-113.13708499px, 56.56854249px);
    }
    35% {
      transform: translate(-94.04564037px, 64.72135955px);
    }
    32.5% {
      transform: translate(-72.63847996px, 71.28052194px);
    }
    30% {
      transform: translate(-49.4427191px, 76.0845213px);
    }
    27.5% {
      transform: translate(-25.02951441px, 79.01506725px);
    }
    25% {
      transform: translate(0px, 80px);
    }
    22.5% {
      transform: translate(25.02951441px, 79.01506725px);
    }
    20% {
      transform: translate(49.4427191px, 76.0845213px);
    }
    17.5% {
      transform: translate(72.63847996px, 71.28052194px);
    }
    15% {
      transform: translate(94.04564037px, 64.72135955px);
    }
    12.5% {
      transform: translate(113.13708499px, 56.56854249px);
    }
    10% {
      transform: translate(129.4427191px, 47.02282018px);
    }
    7.5% {
      transform: translate(142.56104387px, 36.31923998px);
    }
    5% {
      transform: translate(152.16904261px, 24.72135955px);
    }
    2.5% {
      transform: translate(158.0301345px, 12.5147572px);
    }
    0% {
      transform: translate(160px, 0px);
    }
  } */
}
</style>

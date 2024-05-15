<template>
  <div class="wrap">
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <p>这是正文</p>
    <div>
      <div data-0="background-color:rgb(0,0,255);transform[bounce]:rotate(0deg);" data-500-top="background-color:rgb(255,0,0);transform[bounce]:rotate(360deg);">WOOOT</div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
  skrollr.init({
    // forceHeight: false,
  })
})
</script>

<style scoped>
.wrap {
  /* height:100vh; */
}
</style>

// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: import('../view/home.vue') },
  { path: '/video', component: import('../view/video.vue') },
  { path: '/video2', component: import('../view/video2.vue') },
  { path: '/video3', component: import('../view/video3.vue') },
  { path: '/video4', component: import('../view/video4.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
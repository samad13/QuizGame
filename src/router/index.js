import { createRouter, createWebHistory } from 'vue-router';
import StatesOfMatter from '../components/StateOfMatter/StatesOfMatter.vue';
import SwipeQuiz from '../components/SwipeOver/SwipeQuiz.vue';

const routes = [
  { path: '/states-of-matter', component: StatesOfMatter },
  { path: '/swipe-quiz', component: SwipeQuiz },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
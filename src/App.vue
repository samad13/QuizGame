<template>
  <div>
    <div class="flex items-center justify-center space-x-4">
      <button 
        class="bg-blue-500 text-white px-2 py-3 rounded-md hover:bg-green-700 transition duration-300 w-64 text-center"
        @click="navigateTo('/states-of-matter')"
      >
        Go to Tap-to-Reveal
      </button>
      <button 
        class="bg-blue-500 text-white px-2 py-3 rounded-md hover:bg-green-700 transition duration-300 w-64 text-center"
        @click="navigateTo('/swipe-quiz')"
      >
        Go to Swipe UI
      </button>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script>
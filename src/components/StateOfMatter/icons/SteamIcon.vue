<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="props.class"
    >
      <path d="M12 3C16 3 16 7 16 7C16 7 16 11 20 11" />
      <path d="M8 3C4 3 4 7 4 7C4 7 4 11 0 11" />
      <path d="M12 15C16 15 16 19 16 19C16 19 16 23 20 23" />
      <path d="M8 15C4 15 4 19 4 19C4 19 4 23 0 23" />
    </svg>
  </template>
  
  <script setup>
  const props = defineProps({
    class: String
  });
  </script>
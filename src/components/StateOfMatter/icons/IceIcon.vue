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
      <rect x="2" y="8" width="6" height="6" />
      <rect x="14" y="8" width="6" height="6" />
      <rect x="8" y="14" width="6" height="6" />
    </svg>
  </template>
  
  <script setup>
  const props = defineProps({
    class: String
  });
  </script>
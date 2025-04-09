<template>
    <button
      @click="$emit('click')"
      class="absolute top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-lg bg-blue-100 hover:bg-blue-200 border-none flex items-center justify-center transition hover:scale-105 active:scale-95 z-30 shadow-md"
      :class="direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
        <path :d="direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'"></path>
      </svg>
    </button>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    direction: {
      type: String,
      required: true,
      validator: (value) => ['left', 'right'].includes(value)
    }
  });
  
  defineEmits(['click']);
  </script>
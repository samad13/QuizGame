<template>
    <div v-if="show" class="absolute inset-0 flex items-center justify-center z-20">
      <div :class="`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`">
        <p :class="`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`">
          {{ isCorrect ? "Correct!" : "Try again!" }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    show: {
      type: Boolean,
      default: false
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  });
  </script>
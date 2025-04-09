<template>
    <div class="w-full mb-6">
      <h1 class="text-lg font-medium mb-2">{{ title }}</h1>
      <div class="flex space-x-1">
        <div 
          v-for="i in totalSteps" 
          :key="i" 
          class="h-1 w-8 rounded-full" 
          :class="i <= currentStep ? 'bg-blue-700' : 'bg-gray-300'"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    title: {
      type: String,
      default: 'Lesson'
    },
    currentStep: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    }
  });
  </script>
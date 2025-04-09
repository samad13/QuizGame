<template>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <div class="flex space-x-1">
        <div 
          v-for="(dot, index) in totalSteps" 
          :key="index" 
          :class="`h-1 w-6 rounded-full ${index <= currentStep ? 'bg-blue-700' : 'bg-gray-300'}`">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
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
<template>
  <div class="flex flex-col items-center max-w-md w-full">
    <ProgressBar 
      title="Lesson 3.1" 
      :current-step="totalSteps" 
      :total-steps="totalSteps" 
    />
    
    <p class="text-center mb-6">
      Tap the arrows below the cards to swipe the cards in the direction of the correct change.
    </p>
  
    <div class="flex flex-col items-center justify-center h-80 w-full">
      <h2 class="text-3xl font-medium text-gray-800 mb-16">Great Job</h2>
      
      <div class="w-full space-y-4">
        <button 
          @click="$emit('restart')" 
          class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
        >
          Try Again
        </button>
        
        <button
          @click="$emit('next')"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
        >
          Next <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 ml-2"><path d="m9 18 6-6-6-6"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ProgressBar from './ProgressBar.vue';

defineProps({
  totalSteps: {
    type: Number,
    required: true
  }
});

defineEmits(['restart', 'next']);
</script>
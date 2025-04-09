<template>
    <div class="h-40 perspective-1000" @click="$emit('flip')">
      <div :class="`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`">
        <!-- Front of card -->
        <div :class="`absolute w-full h-full flex flex-col items-center justify-center ${frontColor} rounded-xl text-white backface-hidden`">
          <component :is="iconComponent" class="w-8 h-8 mb-2" />
          <span class="font-medium">{{ frontTitle }}</span>
        </div>
  
        <!-- Back of card -->
        <div class="absolute w-full h-full flex flex-col p-4 bg-white rounded-xl shadow-md backface-hidden rotate-y-180">
          <h3 class="text-center font-semibold mb-2 text-lg sm:text-base">{{ backTitle }}</h3>
          <p class="text-sm sm:text-xs text-gray-700 text-center">{{ backDescription }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    frontTitle: {
      type: String,
      required: true
    },
    frontColor: {
      type: String,
      required: true
    },
    iconComponent: {
      type: [Object, Function],
      required: true
    },
    backTitle: {
      type: String,
      required: true
    },
    backDescription: {
      type: String,
      required: true
    },
    isFlipped: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['flip']);
  </script>
  
  <style scoped>
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  </style>
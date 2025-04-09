<template>
    <div>
      <h1 class="text-xl font-medium text-center text-gray-800 mb-6">
        Tap to Discover States of Matter!
      </h1>
      
      <div class="grid grid-cols-2 gap-4 mb-6">
        <FlipCard
          v-for="(info, key) in stateInfo"
          :key="key"
          :front-title="info.name"
          :front-color="info.color"
          :icon-component="info.iconComponent"
          :back-title="getStateType(key)"
          :back-description="info.description"
          :is-flipped="flippedCards[key]"
          @flip="flipCard(key)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import FlipCard from './FlipCard.vue';
  import { stateInfo } from '../../data/states-data';
  
  const props = defineProps({
    flippedCards: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['flip-card']);
  
  const getStateType = (key) => {
    switch (key) {
      case 'steam': return 'Gas';
      case 'water': return 'Liquid';
      case 'ice': return 'Solid';
      case 'lightning': return 'Plasma';
      default: return '';
    }
  };
  
  const flipCard = (key) => {
    emit('flip-card', key);
  };
  </script>
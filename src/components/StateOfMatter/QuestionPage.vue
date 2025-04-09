<template>
    <div>
      <h1 class="text-xl font-medium text-center text-gray-800 mb-6">
        {{ question.question }}
      </h1>
      
      <div class="grid grid-cols-2 gap-4 mb-6">
        <FlipCard
          v-for="(option, index) in question.options"
          :key="index"
          :front-title="option.label"
          :front-color="option.color"
          :icon-component="option.iconComponent"
          :back-title="option.value"
          :back-description="getAnswerFeedback(option.value)"
          :is-flipped="selectedAnswer === option.value"
          @flip="selectAnswer(option.value)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import FlipCard from './FlipCard.vue';
  
  const props = defineProps({
    question: {
      type: Object,
      required: true
    },
    selectedAnswer: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['select-answer']);
  
  const getAnswerFeedback = (value) => {
    return value === props.question.correctAnswer
      ? `Correct! ${getFeedbackText(value)}`
      : 'Not quite. Try again!';
  };
  
  const getFeedbackText = (value) => {
    switch (value) {
      case 'Liquid':
        return 'Liquids take the shape of their container but maintain volume.';
      case 'Gas':
        return 'Gas particles move freely and spread apart.';
      case 'Solid':
        return 'Solids have fixed shape and volume.';
      case 'Plasma':
        return 'Plasma is an ionized gas with unique electrical properties.';
      default:
        return '';
    }
  };
  
  const selectAnswer = (answer) => {
    emit('select-answer', answer);
  };
  </script>
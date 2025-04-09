<template>
  <div class="relative w-full h-96">
    <!-- Stacked cards -->
    <template v-for="(card, index) in remainingCards" :key="card.id">
      <div
        v-if="index < 2" 
        class="absolute rounded-lg shadow-sm"
        :style="{
          backgroundColor: card.color,
          zIndex: 9 - index,
          top: `-${(index + 1) * 8}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${95 - (index + 1) * 5}%`,
          height: '400px'
        }"
      >
      
      </div>
    </template>

    <!-- Main card -->
    <div
      ref="cardRef"
      :key="card.id"
      class="absolute top-0 left-1/2 w-[95%] h-[400px] rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-500"
      :style="{ 
        backgroundColor: card.color, 
        zIndex: 10,
        transform: `translateX(${position.x}px) translateX(-50%)`,
        opacity: position.opacity,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
      }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
    
      
      <div class="bg-white/20 p-4 rounded-full mb-4 mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-white">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
        </svg>
      </div>
      <h2 class="text-white text-xl font-medium">{{ card.title }}</h2>
    </div>

    <!-- Navigation buttons -->
    <NavigationButton direction="left" @click="$emit('swipe', 'left')" />
    <NavigationButton direction="right" @click="$emit('swipe', 'right')" />
    
    <!-- Feedback overlay -->
    <FeedbackOverlay :show="showFeedback" :is-correct="isCorrect" />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

import NavigationButton from './NavigationButton.vue';
import FeedbackOverlay from './FeedbackOverlay.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  remainingCards: {
    type: Array,
    default: () => []
  },
  position: {
    type: Object,
    required: true
  },
  showFeedback: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['dragStart', 'dragMove', 'dragEnd', 'swipe']);

const cardRef = ref(null);
const isDragging = ref(false);
const startX = ref(0);

// Touch/mouse event handlers
const onTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
  isDragging.value = true;
  emit('dragStart', event);
};

const onTouchMove = (event) => {
  if (!isDragging.value) return;
  const currentX = event.touches[0].clientX;
  const diffX = currentX - startX.value;
  emit('dragMove', diffX);
};

const onTouchEnd = () => {
  if (!isDragging.value) return;
  emit('dragEnd');
  isDragging.value = false;
};

const onMouseDown = (event) => {
  startX.value = event.clientX;
  isDragging.value = true;
  emit('dragStart', event);
};

const onMouseMove = (event) => {
  if (!isDragging.value) return;
  const currentX = event.clientX;
  const diffX = currentX - startX.value;
  emit('dragMove', diffX);
};

const onMouseUp = () => {
  if (!isDragging.value) return;
  emit('dragEnd');
  isDragging.value = false;
};
</script>
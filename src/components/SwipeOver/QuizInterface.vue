<template>
    <div class="flex flex-col items-center max-w-md w-full">
      <div class="w-full mb-6">
        <h1 class="text-lg font-medium mb-2">Lesson 3.1</h1>
        <div class="flex justify-between">
          <div
            class="h-1 bg-blue-700 rounded-full"
            :style="{ width: `${(currentIndex / totalQuestions) * 100}%` }"
          ></div>
          <div
            class="h-1 bg-gray-300 rounded-full mx-2.5 max-h-2.5"
            :style="{ width: `${((totalQuestions - currentIndex) / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>
  
      <p class="text-center mb-6">
        Tap the arrows below the cards to swipe the cards in the direction of the correct change.
      </p>
      <div class="flex justify-between items-center w-full mb-6">
        <div class="text-gray-600 text-sm">← Physical Change</div>
        <div class="text-gray-600 text-sm">Chemical Change →</div>
      </div>
  
      <div class="relative w-full h-80 mb-6" ref="constraintsRef">
        <!-- Stacked cards in background -->
        <div
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] h-70 rounded-lg shadow-sm"
          style="background-color: #F72585; z-index: 1;"
        ></div>
        <div
          class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[75%] h-70 rounded-lg shadow-sm"
          style="background-color: #7209B7; z-index: 2;"
        ></div>
  
        <!-- Main card -->
        <QuizCard 
          :card="currentCard" 
          :position="cardPosition"
          @drag-start="onDragStart"
          @drag-move="onDragMove"
          @drag-end="onDragEnd"
        />
  
        <!-- Feedback overlay -->
        <div v-if="showFeedback" class="absolute inset-0 flex items-center justify-center z-10">
          <div :class="`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`">
            <p :class="`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`">
              {{ isCorrect ? "Correct!" : "Try again!" }}
            </p>
          </div>
        </div>
      </div>
  
      <div class="flex justify-between w-full mb-6">
        <button
          @click="handleButtonSwipe('left')"
          class="h-12 w-12 rounded-lg bg-blue-100 hover:bg-blue-200 border-none flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
  
        <button
          @click="handleButtonSwipe('right')"
          class="h-12 w-12 rounded-lg bg-blue-100 hover:bg-blue-200 border-none flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
  
      <button
        @click="handleNext"
        class="w-full bg-red-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Next →
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';
  import QuizCard from './QuizCard.vue';
  
  const props = defineProps({
    currentCard: {
      type: Object,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['correct', 'incorrect', 'next']);
  
  const showFeedback = ref(false);
  const isCorrect = ref(false);
  const cardPosition = ref({ x: 0, opacity: 1 });
  const constraintsRef = ref(null);
  
  // Event handlers
  const onDragStart = () => {
    // Any initialization needed when drag starts
  };
  
  const onDragMove = (diffX) => {
    updateCardPosition(diffX);
  };
  
  const onDragEnd = () => {
    handleDragEnd();
  };
  
  const updateCardPosition = (diffX) => {
    cardPosition.value.x = diffX;
    // Reduce opacity slightly as card moves away from center
    cardPosition.value.opacity = 1 - Math.min(0.4, Math.abs(diffX) / 1000);
  };
  
  const handleDragEnd = () => {
    const threshold = 100;
    const direction = cardPosition.value.x > 0 ? "right" : "left";
    const distance = Math.abs(cardPosition.value.x);
  
    if (distance > threshold) {
      const isAnswerCorrect = direction === props.currentCard.correctAnswer;
  
      if (isAnswerCorrect) {
        // Correct answer - animate card off screen
        animateCardOffScreen(direction);
      } else {
        // Incorrect answer - show feedback and reset card
        showIncorrectFeedback();
      }
    } else {
      // Not swiped far enough - return to center
      resetCardPosition();
    }
  };
  
  const animateCardOffScreen = (direction) => {
    const targetX = direction === "left" ? -500 : 500;
    
    // Animate card off screen
    cardPosition.value = {
      x: targetX,
      opacity: 0
    };
    
    // Show correct feedback
    isCorrect.value = true;
    showFeedback.value = true;
    
    // Move to next card or complete quiz
    setTimeout(() => {
      showFeedback.value = false;
      emit('correct');
    }, 500);
  };
  
  const resetCardPosition = () => {
    cardPosition.value = {
      x: 0,
      opacity: 1
    };
  };
  
  const showIncorrectFeedback = () => {
    isCorrect.value = false;
    showFeedback.value = true;
    
    // Shake animation effect
    const shakeDistance = 20;
    const direction = cardPosition.value.x > 0 ? 1 : -1;
    
    // Quick shake animation
    cardPosition.value.x = shakeDistance * direction;
    
    setTimeout(() => {
      cardPosition.value.x = -shakeDistance * direction;
      
      setTimeout(() => {
        cardPosition.value.x = shakeDistance * direction / 2;
        
        setTimeout(() => {
          resetCardPosition();
          
          setTimeout(() => {
            showFeedback.value = false;
            emit('incorrect');
          }, 500);
        }, 100);
      }, 100);
    }, 100);
  };
  
  const handleButtonSwipe = (direction) => {
    const isAnswerCorrect = direction === props.currentCard.correctAnswer;
  
    if (isAnswerCorrect) {
      // Correct answer
      isCorrect.value = true;
      showFeedback.value = true;
      
      // Animate in direction of swipe
      cardPosition.value.x = direction === "left" ? -100 : 100;
      
      setTimeout(() => {
        animateCardOffScreen(direction);
      }, 300);
    } else {
      // Incorrect answer
      isCorrect.value = false;
      showFeedback.value = true;
      
      // Small movement in wrong direction then reset
      cardPosition.value.x = direction === "left" ? -50 : 50;
      
      setTimeout(() => {
        resetCardPosition();
        
        setTimeout(() => {
          showFeedback.value = false;
        }, 500);
      }, 500);
    }
  };
  
  const handleNext = () => {
    emit('next');
  };
  </script>
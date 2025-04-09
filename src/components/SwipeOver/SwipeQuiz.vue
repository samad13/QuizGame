<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="flex flex-col items-center max-w-md w-full bg-white p-6 rounded-lg shadow-sm">
      <!-- Completed screen -->
      <CompletionScreen 
        v-if="isCompleted" 
        :total-steps="quizData.length"
        @restart="restartQuiz"
        @next="handleNextLesson"
      />
      
      <!-- Quiz interface -->
      <div v-else class="flex flex-col items-center max-w-md w-full">
        <ProgressBar 
          title="Lesson 3.1" 
          :current-step="currentCardIndex + 1" 
          :total-steps="quizData.length" 
        />
      
        <p class="text-center mb-6">
          Tap the arrows below the cards to swipe the cards in the direction of the correct change.
        </p>
        <div class="flex justify-between items-center w-full mb-6">
          <div class="text-gray-600 text-sm">← Physical Change</div>
          <div class="text-gray-600 text-sm">Chemical Change →</div>
        </div>
      
        <QuizCard
          :card="currentCard"
          :remaining-cards="remainingCards"
          :position="cardPosition"
          :show-feedback="showFeedback"
          :is-correct="isCorrect"
          @drag-start="onDragStart"
          @drag-move="onDragMove"
          @drag-end="onDragEnd"
          @swipe="handleButtonSwipe"
        />
      
        <button
          @click="handleNext"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg mt-6"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { quizData } from '../../data/quiz-data';
import ProgressBar from '../SwipeOver/ProgressBar.vue';
import QuizCard from '../SwipeOver/QuizCard.vue';
import CompletionScreen from './CompletionScreen.vue';


// Reactive state
const currentCardIndex = ref(0);
const isCompleted = ref(false);
const showFeedback = ref(false);
const isCorrect = ref(false);
const cardPosition = ref({ x: 0, opacity: 1 });
const isAnimating = ref(false);

// Watch for card changes to reset position
watch(() => currentCardIndex.value, () => {
  resetCardPosition();
});

// Computed properties
const currentCard = computed(() => quizData[currentCardIndex.value]);

// Get remaining cards (cards after the current one)
const remainingCards = computed(() => {
  return quizData.slice(currentCardIndex.value + 1);
});

// Event handlers
const onDragStart = () => {
  if (isAnimating.value) return;
};

const onDragMove = (diffX) => {
  if (isAnimating.value) return;
  updateCardPosition(diffX);
};

const onDragEnd = () => {
  if (isAnimating.value) return;
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
    const isAnswerCorrect = direction === currentCard.value.correctAnswer;

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
  isAnimating.value = true;
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
    if (currentCardIndex.value < quizData.length - 1) {
      currentCardIndex.value++;
      resetCardPosition();
    } else {
      isCompleted.value = true;
    }
    isAnimating.value = false;
  }, 500);
};

const resetCardPosition = () => {
  cardPosition.value = {
    x: 0,
    opacity: 1
  };
};

const showIncorrectFeedback = () => {
  isAnimating.value = true;
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
          isAnimating.value = false;
        }, 500);
      }, 100);
    }, 100);
  }, 100);
};

const handleButtonSwipe = (direction) => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  const isAnswerCorrect = direction === currentCard.value.correctAnswer;
  const swipeDistance = direction === "left" ? -200 : 200;

  // First animate the card in the direction of the swipe with easing
  cardPosition.value.x = swipeDistance / 2;
  
  // After a short delay, continue the animation
  setTimeout(() => {
    cardPosition.value.x = swipeDistance;
    
    if (isAnswerCorrect) {
      // Correct answer
      isCorrect.value = true;
      showFeedback.value = true;
      
      setTimeout(() => {
        animateCardOffScreen(direction);
      }, 300);
    } else {
      // Incorrect answer
      isCorrect.value = false;
      showFeedback.value = true;
      
      setTimeout(() => {
        // Shake animation
        const shakeDistance = 20;
        const shakeDir = direction === "left" ? 1 : -1;
        
        cardPosition.value.x = swipeDistance - (shakeDistance * shakeDir);
        
        setTimeout(() => {
          cardPosition.value.x = swipeDistance + (shakeDistance * shakeDir);
          
          setTimeout(() => {
            resetCardPosition();
            
            setTimeout(() => {
              showFeedback.value = false;
              isAnimating.value = false;
            }, 500);
          }, 100);
        }, 100);
      }, 300);
    }
  }, 150);
};

const handleNext = () => {
  if (isAnimating.value) return;
  
  if (currentCardIndex.value < quizData.length - 1) {
    // Animate card off to the right
    isAnimating.value = true;
    cardPosition.value.x = 300;
    cardPosition.value.opacity = 0;
    
    setTimeout(() => {
      currentCardIndex.value++;
      resetCardPosition();
      isAnimating.value = false;
    }, 300);
  } else {
    isCompleted.value = true;
  }
};

const restartQuiz = () => {
  currentCardIndex.value = 0;
  isCompleted.value = false;
  resetCardPosition();
};

const handleNextLesson = () => {
  // In a real app, this would navigate to the next lesson
  // For now, we'll just restart the quiz
  restartQuiz();
};
</script>

<style scoped>
/* Add CSS transitions for smooth animations */
.transition-all {
  transition-property: all;
}

.duration-500 {
  transition-duration: 500ms;
}
</style>
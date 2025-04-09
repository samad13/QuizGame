<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-gray-100 rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 pb-0">
          <ProgressBar 
            title="Lesson 2.1" 
            :current-step="currentPage" 
            :total-steps="4" 
          />
          
          <!-- Main states of matter page -->
          <StatesPage 
            v-if="currentPage === 0"
            :flipped-cards="flippedCards"
            @flip-card="flipCard"
          />
          
          <!-- Question pages -->
          <QuestionPage
            v-else-if="currentPage >= 1 && currentPage <= 3"
            :question="questionPages[currentPage - 1]"
            :selected-answer="selectedAnswers[currentPage - 1]"
            @select-answer="answer => selectAnswer(currentPage - 1, answer)"
          />
          
          <div class="flex justify-center mb-6">
            <button 
              class="w-full py-3 bg-[#2E3192] text-white font-medium rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center"
              @click="nextPage"
              :disabled="shouldDisableNext"
            >
              {{ currentPage < 3 ? 'Next' : 'Restart' }} <span class="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ProgressBar from '../StateOfMatter/ProgressBar.vue';
  import StatesPage from '../StateOfMatter/StatesPage.vue';
  import QuestionPage from './QuestionPage.vue';
  import { questionPages } from '../../data/states-data';
  
  // Current page (0 = main page, 1-3 = questions)
  const currentPage = ref(0);
  
  // State to track which cards are flipped
  const flippedCards = ref({
    steam: false,
    water: false,
    ice: false,
    lightning: false
  });
  
  // Selected answers for each question
  const selectedAnswers = ref(["", "", ""]);
  
  // Function to flip a card
  const flipCard = (stateKey) => {
    flippedCards.value[stateKey] = !flippedCards.value[stateKey];
  };
  
  // Function to select an answer
  const selectAnswer = (questionIndex, answer) => {
    // Set the selected answer
    selectedAnswers.value[questionIndex] = answer;
  };
  
  // Determine if Next button should be disabled
  const shouldDisableNext = computed(() => {
    if (currentPage.value === 0) {
      return false; // Always enabled on the main page
    } else if (currentPage.value >= 1 && currentPage.value <= 3) {
      // Disable if no answer is selected for the current question
      return !selectedAnswers.value[currentPage.value - 1];
    }
    return false;
  });
  
  // Function to go to next page
  const nextPage = () => {
    if (currentPage.value < 3) {
      currentPage.value++;
    } else {
      // Reset the quiz
      currentPage.value = 0;
      selectedAnswers.value = ["", "", ""];
      Object.keys(flippedCards.value).forEach(key => {
        flippedCards.value[key] = false;
      });
    }
  };
  </script>
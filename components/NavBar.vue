<script setup>
import { useDarkMode } from "~/composables/useDarkMode";
import { Moon, Sun } from 'lucide-vue-next';
import { ref } from 'vue';

const { isDarkMode, toggleDarkMode, initDarkMode } = useDarkMode();
const isTransitioning = ref(false);

const handleToggle = () => {
  isTransitioning.value = true;
  toggleDarkMode();
  setTimeout(() => {
    isTransitioning.value = false;
  }, 100);
};

onMounted(() => {
  initDarkMode();
});
</script>

<template>
  <nav class="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white pt-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- <img class="w-6" src="https://cdn-icons-png.flaticon.com/512/2790/2790220.png" alt=""> -->
       <NuxtLink to="/" class="text-sm">
        🧠
       </NuxtLink>
      <div>
        <button
          @click="handleToggle"
          class="p-1.5 rounded-3xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white relative"
        >
          <div class="relative w-5 h-5">
            <Moon
              size="19"
              class="absolute inset-0 transition-all duration-200 transform"
              :class="{
                'opacity-0 rotate-90 scale-0': !isDarkMode || isTransitioning,
                'opacity-100 rotate-0 scale-100': isDarkMode && !isTransitioning
              }"
            />
            <Sun
              size="19"
              class="absolute inset-0 transition-all duration-200 transform"
              :class="{
                'opacity-0 -rotate-90 scale-0': isDarkMode || isTransitioning,
                'opacity-100 rotate-0 scale-100': !isDarkMode && !isTransitioning
              }"
            />
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
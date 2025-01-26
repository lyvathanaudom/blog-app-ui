<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Loader } from 'lucide-vue-next';
import type {Post} from "../../models/Post"
const route = useRoute()

const post = ref<Post>({
  title: '',
  content: '',
  date: '',
  slug: ''
})
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPost = async (slug: string) => {
  try {
    error.value = null
    if (!slug) throw new Error('Post slug is required')
    
    loading.value = true
    const data = await useApiClient()(`/posts/${slug}`)
    
    if (!data) throw new Error('Post not found')
    post.value = data
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    console.error('Error fetching post:', err)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) fetchPost(newSlug as string)
  },
  { immediate: true }
)
</script>

<template>
  <article class="max-w-3xl mx-auto">
    <div>
      <!-- Loading State -->
      <div 
        v-if="loading" 
        class="flex flex-col items-center justify-center min-h-[300px] space-y-4"
      >
        <Loader class="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
      </div>

      <!-- Error State -->
      <div 
        v-else-if="error" 
        class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/50"
      >
        <div class="flex flex-col items-start space-y-4">
          <div class="text-red-600 dark:text-red-400 font-medium">
            {{ error }}
          </div>
          <button
            @click="fetchPost(route.params.slug as string)"
            class="text-sm px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-300 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Content -->
      <div v-else class="py-16 space-y-8 animate-fade-in">
        <header class="flex flex-col gap-2">
          
          <h1 class="text-4xl font-bold tracking-tight dark:text-white">
            {{ post.title }}
          </h1>
          <time 
            :datetime="post.date"
            class="text-sm text-gray-500 sm:font-normal font-bold dark:text-gray-400"
          >
             {{ new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) }}
          </time>
        </header>

        <div 
          class="prose dark:prose-invert max-w-none prose-lg"
          v-html="post.content"
        />
      </div>
    </div>
  </article>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dark .prose-invert {
  --tw-prose-body: #d1d5db;
  --tw-prose-headings: #f3f4f6;
  --tw-prose-links: #60a5fa;
  --tw-prose-code: #f3f4f6;
}
</style>
<template>
  <div class="mx-auto">
    <h1 class="text-3xl font-bold dark:text-white my-16">Blog</h1>
    <div class="space-y-4">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/posts/${post.slug}`"
        class="flex gap-4 items-center"
      >
        <div>{{ formatDate(post.date) }}</div>
        <div
          class="underline hover:no-underline cursor-pointer transition-all duration-200"
        >
          {{ post.title }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const formatDate = (dateString: string) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const {
  data: posts,
  pending,
  error,
} = useAsyncData("posts", async () => {
  try {
    return await useApiClient()("/posts");
  } catch (err) {
    throw new Error(`Failed to load posts: ${(err as Error).message}`);
  }
});
</script>

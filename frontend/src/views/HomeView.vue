<template>
  <div>
    <h1 style="font-size: 1.75rem; margin-bottom: 1.5rem;">Latest Posts</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="posts.length === 0" class="empty">No posts yet.</div>
    <div v-else>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPosts } from '../api/posts'
import PostCard from '../components/PostCard.vue'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    posts.value = await fetchPosts()
  } catch (e) {
    console.error('Failed to load posts:', e)
  } finally {
    loading.value = false
  }
})
</script>

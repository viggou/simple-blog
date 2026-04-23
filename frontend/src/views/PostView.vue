<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="empty">
      <p>Post not found.</p>
      <p><RouterLink to="/">Back to home</RouterLink></p>
    </div>
    <article v-else>
      <div class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="meta">{{ formatDate(post.created_at) }}</div>
      </div>
      <MarkdownContent :content="post.content" />
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPost } from '../api/posts'
import MarkdownContent from '../components/MarkdownContent.vue'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  try {
    post.value = await fetchPost(route.params.slug)
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

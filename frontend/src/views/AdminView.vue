<template>
  <div>
    <div class="admin-header">
      <h1>Posts</h1>
      <RouterLink to="/admin/new" class="btn btn-primary">New Post</RouterLink>
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="posts.length === 0" class="empty">No posts yet. Create your first one!</div>

    <table v-else class="posts-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>
            <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
          </td>
          <td>
            <span v-if="post.published" style="color: #059669;">Published</span>
            <span v-else style="color: #9ca3af;">Draft</span>
          </td>
          <td style="color: #6b7280; font-size: 0.85rem;">{{ formatDate(post.created_at) }}</td>
          <td class="actions">
            <RouterLink :to="`/admin/edit/${post.id}`">Edit</RouterLink>
            <button class="btn-danger" @click="handleDelete(post)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllPosts, deletePost } from '../api/posts'

const posts = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

async function loadPosts() {
  try {
    posts.value = await fetchAllPosts()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function handleDelete(post) {
  if (!confirm(`Delete "${post.title}"?`)) return
  try {
    await deletePost(post.id)
    posts.value = posts.value.filter(p => p.id !== post.id)
  } catch (e) {
    error.value = e.message
  }
}

onMounted(loadPosts)
</script>

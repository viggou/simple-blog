<template>
  <div>
    <h1 style="font-size: 1.5rem; margin-bottom: 1.5rem;">{{ isEdit ? 'Edit Post' : 'New Post' }}</h1>

    <div v-if="loadError" class="error-message">{{ loadError }}</div>
    <div v-if="loading" class="loading">Loading...</div>

    <form v-else class="editor-form" @submit.prevent="handleSubmit">
      <div v-if="submitError" class="error-message">{{ submitError }}</div>

      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="form.title" type="text" required placeholder="Post title" />
      </div>

      <div class="form-group">
        <label for="excerpt">Excerpt</label>
        <input id="excerpt" v-model="form.excerpt" type="text" placeholder="Short description" />
      </div>

      <div class="editor-layout">
        <div class="form-group">
          <label for="content">Content (Markdown)</label>
          <textarea id="content" v-model="form.content" placeholder="Write your post..."></textarea>
        </div>

        <div class="preview-pane">
          <h3>Preview</h3>
          <div class="markdown-content" v-html="preview"></div>
        </div>
      </div>

      <div class="form-group checkbox-group">
        <input id="published" v-model="form.published" type="checkbox" />
        <label for="published">Published</label>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : (isEdit ? 'Update' : 'Create') }}
        </button>
        <RouterLink to="/admin">Cancel</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPost, updatePost, fetchAllPosts } from '../api/posts'
import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: true })

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const loadError = ref('')
const submitError = ref('')
const saving = ref(false)

const form = ref({
  title: '',
  excerpt: '',
  content: '',
  published: false
})

const preview = computed(() => marked(form.value.content || ''))

onMounted(async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const posts = await fetchAllPosts()
    const post = posts.find(p => p.id === Number(route.params.id))
    if (!post) {
      loadError.value = 'Post not found'
      return
    }
    form.value = {
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      published: post.published
    }
  } catch (e) {
    loadError.value = e.message
  } finally {
    loading.value = false
  }
})

async function handleSubmit() {
  submitError.value = ''
  saving.value = true
  try {
    if (isEdit.value) {
      await updatePost(route.params.id, form.value)
    } else {
      await createPost(form.value)
    }
    router.push('/admin')
  } catch (e) {
    submitError.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

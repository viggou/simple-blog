<template>
  <article class="post-card">
    <h2>
      <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
      <span v-if="!post.published" class="badge badge-draft">Draft</span>
    </h2>
    <div class="meta">{{ formatDate(post.created_at) }}</div>
    <p class="excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
  </article>
</template>

<script setup>
defineProps({ post: { type: Object, required: true } })

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

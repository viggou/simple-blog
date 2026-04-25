<template>
  <div class="markdown-content" v-html="html"></div>
</template>

<script setup>
defineProps({ html: { type: String, default: '' } })
</script>

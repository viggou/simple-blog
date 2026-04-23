<template>
  <div class="markdown-content" v-html="rendered"></div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({ content: { type: String, default: '' } })

marked.setOptions({ gfm: true, breaks: true })

const rendered = computed(() => marked(props.content || ''))
</script>

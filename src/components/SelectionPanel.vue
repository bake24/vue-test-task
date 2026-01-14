<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="panel" :class="variant ? `panel--${variant}` : null">
    <div class="panel__header">{{ title }}</div>
    <div class="panel__content">
      <slot />
    </div>
    <div v-if="$slots.meta" class="panel__meta">
      <slot name="meta" />
    </div>
  </section>
</template>
